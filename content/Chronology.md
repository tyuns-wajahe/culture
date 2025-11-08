(If the timeline doesn't display, try refreshing the page!)
<div id="visualization"></div>

<link href="https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css" rel="stylesheet" />
<script src="https://unpkg.com/vis-timeline@latest/standalone/umd/vis-timeline-graph2d.min.js"></script>

<script type="module">
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('visualization');

    // Slugify titles for Quartz-style URLs
    function slugify(text) {
      return text
        .replace(/[^A-Za-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Your timeline events
    const events = [
      { title: 'The Ksehyl', start: '0000-01-01', type: 'point' },
      { title: 'Early Clan Centralization', start: '0375-01-01', end: '0425-01-01', type: 'range' },
      { title: 'Ksehen Resurgent', start: '680-01-01', type: 'point' },
      {  title: 'The Founding of Kheze', start: '1028-01-01', type: 'point' },
	  { title: 'Predynastic Period', start: '0000-01-01', end: '1728-01-01', type: 'background' },
	  { title: 'First Dynasty', start: '1731-01-01', end: '2122-01-01', type: 'background' },
	  { title: 'First Intermediate Period', start: '2181-01-01', end: '2592-01-01', type: 'background' },
	  { title: 'Decline of the Riverine Civilization', start: '2625-01-01', end: '2800-01-01', type: 'range' },
	  { title: 'The Old Wajahic Script', start: '1550-01-01', type: 'point' },
	  { title: 'Emergence of the Abjad', start: '1800-01-01', type: 'point' },
	  { title: 'Low and High Abjads', start: '2100-01-01', type: 'point' },
	  { title: 'Classical Abjad', start: '2450-01-01', type: 'point' },
	  { title: 'Middle Abjad', start: '2870-01-01', type: 'point' },
	  { title: 'Invention of Wool Processing', start: '1125-01-01', type: 'point' },
	  { title: 'Invention of Glass and Pottery Glaze', start: '1430-01-01', type: 'point' },
	  { title: 'Emergence of Early Philosophy', start: '1650-01-01', type: 'point' },
	  { title: 'Law Code of the 1st Dynasty', start: '1738-01-01', type: 'point' },
	  { title: 'Law Code of the Clan of Whiterun', start: '3087-01-01', type: 'point' },
	  { title: 'The Kih Wajahe', start: '1290-01-01', end: '2065-01-01', type: 'range' },
	  { title: 'The Contest of Chiefs', start: '250-01-01', type: 'point' },
	  { title: 'Early Currency', start: '1700-01-01', type: 'point' },
	  { title: 'The Southern War', start: '1878-01-01', type: 'point' },
	  { title: 'The Battle of Kshnel', start: '2119-01-01', type: 'point' },
	  { title: 'The Battle of 7 Chiefs', start: '2122-01-01', type: 'point' },
	  { title: 'Liberation of Whiterun', start: '2181-01-01', type: 'point' },
	  { title: 'The Custard Wars', start: '2217-01-01', type: 'point' },
	  { title: 'The Second Sack of Ksehen', start: '2232-01-01', type: 'point' },
	  { title: 'The Tsyw War', start: '2293-01-01', type: 'point' },
	  { title: 'The First Kapapt War', start: '2437-01-01', type: 'point' },
	  { title: 'The Second Kapapt War', start: '2441-01-01', type: 'point' },
    ];

    const items = new vis.DataSet(
      events.map((event) => {
        const link = document.createElement('a');
        link.href = `./History/${slugify(event.title)}`;
        link.textContent = event.title;
        link.classList.add('internal');
        link.classList.add('dyn-popover');
        
        switch (event.title) {
	        case 'The Old Wajahic Script':
		        link.href = `./Wajahic-Scripts#the-old-wajahic-script`;
		        break;
		    case 'Emergence of the Abjad':
		        link.href = `./Wajahic-Scripts#early-abjads`;
		        break;
		    case 'Low and High Abjads':
		        link.href = `./Wajahic-Scripts#early-abjads`;
		        break;
		    case 'Classical Abjad':
		        link.href = `./Wajahic-Scripts#classical-wajahic-script`;
		        break;
		    case 'Middle Abjad':
		        link.href = `./Wajahic-Scripts#middle-wajahic-abjad`;
		        break;
		    case 'Invention of Wool Processing':
		        link.href = `./Technologies/Wool-Processing`;
		        break;
		    case 'Invention of Glass and Pottery Glaze':
		        link.href = `./Technologies/Glass-and-Glaze`;
		        break;
		    case 'Emergence of Early Philosophy':
		        link.href = `./Misc/Early-Wajahe-Philosophy`;
		        break;
		    case 'The Kih Wajahe':
		        link.href = `./States-and-Clans/Tim-Clan`;
		        break;
		    case 'The Contest of Chiefs':
		        link.href = `./History/Predynastic-Period`;
		        break;
		    case 'Early Currency':
		        link.href = `./Technologies/Currency`;
		        break;
		    case 'First Dynasty':
		        link.href = `./States-and-Clans/Ksehen-Clan#the-first-dynasty`;
		        break;
		    case 'The Southern War':
		        link.href = `./States-and-Clans/Ksehen-Clan#the-southern-war`;
		        break;
		    case 'The Battle of Kshnel':
			    link.href = `./States-and-Clans/Ksehen-Clan#collapse-of-the-first-dynasty`;
		        break;
		    case 'The Battle of 7 Chiefs':
			    link.href = `./States-and-Clans/Ksehen-Clan#collapse-of-the-first-dynasty`;
		        break;
		    case 'The Second Sack of Ksehen':
			    link.href = `./History/sack-of-ksehen-(2232-KS)`;
		        break;
		    case 'The First Kapapt War':
			    link.href = `./History/Kapapt-Wars`;
		        break;
		    case 'The Second Kapapt War':
			    link.href = `./History/Kapapt-Wars`;
		        break;
        }
        
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
      showCurrentTime: false,
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
  const previewCache = {};

  function createPopover(link, contentHTML) {
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
      const preview = temp.querySelector('.center');
      if (!preview) return '<em>No preview found</em>';
      const content = preview?.outerHTML ?? preview.innerHTML.slice(0, 300);
      previewCache[href] = content;
      return content;
    } catch (err) {
      return `<em>Error loading preview</em>`;
    }
  }

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
      link.addEventListener('mouseleave', () => { removePopover(); });
    });
  }

  window.addEventListener('DOMContentLoaded', enableDynamicPopovers);
</script>

```
(85-68)*25+(68-20)*50-22
```