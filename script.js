const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i => {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});

const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})

const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Sales ($)',
            data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 2500, 3800, 5200, 4800, 6000],
            backgroundColor: '#3C91E6', 
            borderRadius: 5, 
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false 
            }
        }
    }
});
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

// fixed download button script
const downloadBtn = document.querySelector('.btn-download');

downloadBtn.addEventListener('click', function() {
    const element = document.querySelector('main'); 

    const originalOverflow = element.style.overflow;
    const originalMaxHeight = element.style.maxHeight;

    element.style.overflow = 'visible';
    element.style.maxHeight = 'none';

    const opt = {
      margin:       0.5,
      filename:     'DataDeck-Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 }, 
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } 
    };

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.overflow = originalOverflow;
        element.style.maxHeight = originalMaxHeight;
    });
});

const searchInput = document.querySelector('.form-input input');
const tableRows = document.querySelectorAll('table tbody tr');

searchInput.addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase();

    tableRows.forEach(row => {
        const name = row.querySelector('td p').innerText.toLowerCase();
        
        if(name.includes(searchValue)) {
            row.style.display = ''; 
        } else {
            row.style.display = 'none'; 
        }
    })
});