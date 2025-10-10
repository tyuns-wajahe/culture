
<div id="visualization"></div>

<link href="https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css" rel="stylesheet" />
<script src="https://unpkg.com/vis-timeline@latest/standalone/umd/vis-timeline-graph2d.min.js"></script>

[[The First War]]

<script type="module">
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('visualization');

    // Slugify titles for Quartz-style URLs
    function slugify(text) {
      return text
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Your timeline events
    const events = [
      { title: 'The First War', start: '0000-01-01', group: 'inst' },
      { title: 'Early Clan Centralization', start: '0375-01-01', end: '0425-01-01', group: 'period' },
      {  title: 'The Founding of Kheze', start: '1028-01-01', group: 'inst' },
	{ title: 'Predynastic Period', start: '0000-01-01', end: '1728-01-01', type: 'background'}
    ];
    //      

    // Create a DataSet with DOM elements for content
    const items = new vis.DataSet(
      events.map((event) => {
        const link = document.createElement('a');
        link.href = `./History/${slugify(event.title)}`;
        link.textContent = event.title;
        link.classList.add('internal');
        link.classList.add('dyn-popover');
        
        const outevent = {
          start: event.start,
          content: link
        };
        
        if (event.type) {
	        outevent.type = event.type;
	    }
	    
	    if (event.end) {
	        outevent.end = event.end;
	    }
	    
	    if (event.group) {
	        outevent.group = event.group;
	    }
        
		return outevent;
      })
    );

    const options = {
      editable: false,
      margin: { item: 20 },
      format: {
	      majorLabels: {
		      year: 'YYYY'
	      },
	      minorLabels: {}    
	  }
    };

    new vis.Timeline(container, items, options);
	
	if (typeof popoverScript === 'function') {
      popoverScript();
    }
  });
</script>

<script type="module">
  // Store previews to avoid refetching
  const previewCache = {};

  function createPopover(link, contentHTML) {
    // Remove existing popovers
    document.querySelectorAll('.dynamic-popover').forEach(p => p.remove());

    const popover = document.createElement('div');
    popover.className = 'dynamic-popover';
    popover.innerHTML = contentHTML;
    document.body.appendChild(popover);

    const rect = link.getBoundingClientRect();
    popover.style.top = `${window.scrollY + rect.bottom + 5}px`;
    popover.style.left = `${window.scrollX + rect.left}px`;
  }

  function removePopover() {
    document.querySelectorAll('.dynamic-popover').forEach(p => p.remove());
  }

  async function fetchPreview(href) {
    if (previewCache[href]) return previewCache[href];

    try {
      const res = await fetch(href);
      const html = await res.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // You may want to refine this selector
      const preview = temp.querySelector('.center');

      if (!preview) return '<em>No preview found</em>';
      
      const content = preview?.outerHTML ?? preview.innerHTML.slice(0, 300);
      
      previewCache[href] = content;
      return content;
    } catch (err) {
      return `<em>Error loading preview</em>`;
    }
  }

  // Attach to dynamically inserted internal links
  function enableDynamicPopovers() {
    document.querySelectorAll('a.dyn-popover').forEach(link => {
      if (link.dataset.popoverBound === 'true') return;

      link.dataset.popoverBound = 'true';

      link.addEventListener('mouseenter', async () => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http')) return;

        const previewHTML = await fetchPreview(href);
        createPopover(link, previewHTML);
      });

      link.addEventListener('mouseleave', () => {
        removePopover();
      });
    });
  }

  // Run after DOM content loaded + after timeline is inserted
  window.addEventListener('DOMContentLoaded', enableDynamicPopovers);
  // Optional: rerun if you add links later
  window.enableDynamicPopovers = enableDynamicPopovers;
</script>





