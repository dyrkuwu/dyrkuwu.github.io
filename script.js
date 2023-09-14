var buttonContainer = document.querySelector('.win-btns');
var tabs = document.querySelectorAll('.tab');

buttonContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        tabs.forEach(function (tab) {
            tab.style.display = 'none';
        });

        var buttonIndex = Array.from(buttonContainer.children).indexOf(event.target);

        tabs[buttonIndex].style.display = 'block';
    }
});
