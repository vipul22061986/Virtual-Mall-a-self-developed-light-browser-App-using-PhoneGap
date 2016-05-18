module.exports = {
    create: function(success, error, args) {
        var duration = args[1] ? args[1] : 0;
        var text = args[0] ? args[0] : '';

        var element = document.querySelector('section[role="status"].toaster');

        if (!element) {

            var link = document.createElement("link");
            link.href = findCordovaPath() + "css/toast.css";
            link.type = "text/css";
            link.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(link);

            //     <section role="status" class="toaster collapsed">
            //     <p class="toaster-text"></p>
            // </section>

            var section = document.createElement('section');
            section.setAttribute('role', 'status');
            section.classList.add('toaster');
            section.classList.add('collapsed');

            var p = document.createElement('p');
            p.classList.add('toaster-text');

            section.appendChild(p);

            var body = document.getElementsByTagName("body");
            body[0].appendChild(section);

            element = document.querySelector('section[role="status"].toaster');
            element.style.background = 'url('+findCordovaPath()+'img/pattern.png) repeat left top, url('+findCordovaPath()+'img/gradient.png) no-repeat left top / 100% 100%';
        }

        if (element) {
            element.children[0].innerHTML = args[0];
            fadein(element);
            var time = 2000;

            if (args[1] === 1) {
                time = 3500;
            }

            setTimeout(function() {
                fadeout(element);
            }, time);

            success('Deu certo!');
        } else {
            error('Not work!');
        }

        function fadeout(element) {
            element.classList.remove('fadein');
            element.classList.add('fadeout');
            element.classList.add('anim-opacity');
            setTimeout(function() {
                element.classList.add('collapsed');
                element.children[0].innerHTML = '';
            }, 500);
        }

        function fadein(element) {
            element.classList.remove('fadeout');
            element.classList.remove('anim-opacity');
            element.classList.remove('collapsed');
            element.classList.add('fadein');
        }

        function findCordovaPath() {
            var path = null;
            var scripts = document.getElementsByTagName('script');
            var term = '/cordova.js';
            for (var n = scripts.length - 1; n > -1; n--) {
                var src = scripts[n].src.replace(/\?.*$/, ''); // Strip any query param (CB-6007).
                if (src.indexOf(term) == (src.length - term.length)) {
                    path = src.substring(0, src.length - term.length) + '/';
                    break;
                }
            }
            return path;
        }
    }

};

require("cordova/exec/proxy").add("Toast", module.exports);