var data = JSON.parse(document.getElementById('data').innerText);
React.render(React.createElement(Page, data), document.getElementById('application'));
