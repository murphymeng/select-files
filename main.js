initDraw(document.getElementById('table'));



function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX;
            mouse.y = ev.pageY;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    $('body').mouseup(function(e) {
      if (element !== null) {



        $(element).remove();
        element = null;
        canvas.style.cursor = "default";
        console.log("finsihed.");


        //console.log(e.pageX + window.pageXOffset);
      }
    });

    $('body').mousemove(function(e) {
      if (element) {
        setMousePosition(e);
        if (element !== null) {
          var mouseX = mouse.x;
          var mouseY = mouse.y;
          if (mouse.x > $(canvas).position().left + $(canvas).width()) {
            mouseX = $(canvas).position().left + $(canvas).width();
          } else if (mouse.x < $(canvas).position().left) {
            mouseX = $(canvas).position().left;
          }

          if (mouse.y > $(canvas).position().top + $(canvas).height()) {
            mouseY = $(canvas).position().top + $(canvas).height();
          } else if (mouse.y < $(canvas).position().top) {
            mouseY = $(canvas).position().top;
          }

          element.style.width = Math.abs(mouseX - mouse.startX) + 'px';
          element.style.height = Math.abs(mouseY - mouse.startY) + 'px';
          element.style.left = (mouseX - mouse.startX < 0) ? mouseX + 'px' : mouse.startX + 'px';
          element.style.top = (mouseY - mouse.startY < 0) ? mouseY + 'px' : mouse.startY + 'px';

          var top = $(element).position().top;
          var bottom = $(element).position().top + $(element).height();

          $('tr').css('background', 'white');
          var files = [];
          $('tr').each(function(key, item) {
            var trTop = $(item).position().top;
            var trBottom = $(item).position().top + $(item).height();

            if (trTop > bottom || trBottom < top) {

            } else {
              item.style.background = '#4285f4';
              files.push(item.__vue__.file);
            }
          });
          console.log(files);
        }
      }

    });

    canvas.onmousemove = function (e) {

    }

    canvas.onclick = function (e) {
    }

    canvas.onmouseup = function(e) {

    }

    canvas.onmousedown = function(e) {
      console.log("begun.");
      setMousePosition(e);
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
      element = document.createElement('div');
      element.className = 'rectangle'
      element.style.left = mouse.x + 'px';
      element.style.top = mouse.y + 'px';
      canvas.appendChild(element)
      canvas.style.cursor = "crosshair";
    }
}

var MyTr = Vue.extend({
  props: ['file'],
  template: '<tr><td>{{file.text}}</td></tr>'
})

Vue.component('mytr', MyTr)


var app = new Vue({
    el: '#canvas',
    data: {
        mf: "mfmf",
        files: [{
            id: 'id1',
            text: 'Learn JavaScript'
        }, {
            id: 'id2',
            text: 'Learn Vue.js'
        }, {
            id: 'id3',
            text: 'Build Something Awesome'
        }, {
            id: 'id4',
            text: 'Learn JavaScript'
        }, {
            id: 'id5',
            text: 'Learn Vue.js'
        }, {
            id: 'id6',
            text: 'Build Something Awesome'
        }]
    },
    methods: {

    }
});
