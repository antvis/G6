(function () {
  // filtering
  var $query = $('#query');

  function filter() {
    var str = $query.val();

    if (!str) {
      $('.demo-thumbnail').show();
    } else {
      $('.demo-thumbnail').each(function () {
        var $thumbnail = $(this);
        var basename = $thumbnail.data('basename');

        if (basename.indexOf(str) === -1) {
          $thumbnail.hide();
        } else {
          $thumbnail.show();
        }
      });
    }
  }

  $query.on('input', _.debounce(filter)); // router

  var currentId;
  var $code = $('#code');
  var htmlEditor = CodeMirror.fromTextArea($code[0], {
    mode: "text/html",
    extraKeys: {
      'Ctrl-Space': 'autocomplete'
    },
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    lineNumbers: true,
    lineWrapping: false
  });
  var $docContainer = $('#doc-container');
  var $chartPanel = $('#chart-panel');
  var $codePanel = $('#code-panel');

  function syncCode(code) {
    $chartPanel.html('<iframe class="chart-frame" frameborder="0"></iframe>');
    $chartPanel.find('iframe')[0].contentWindow.document.write(code);
    htmlEditor.getDoc().setValue(code);
  }

  routie({
    '/:id': function id(_id) {
      $docContainer.show();
      var $htmlCode = $("#code-" + _id);
      var code = $htmlCode.text();
      syncCode(code);
    },
    '': function _(id) {
      $docContainer.hide();
    }
  }); // resizable

  $codePanel.resizable({
    handleSelector: '#resize-handler',
    resizeWidthFrom: 'right',
    resizeHeight: false,
    onDragStart: function onDragStart() {
      $docContainer.css('pointer-events', 'none');
      $docContainer.css('cursor', 'col-resize');
      $codePanel.find('.CodeMirror-gutter-elt').css('cursor', 'col-resize');
    },
    onDragEnd: function onDragEnd() {
      $docContainer.css('pointer-events', 'auto');
      $docContainer.css('cursor', 'default');
      $codePanel.find('.CodeMirror-gutter-elt').css('cursor', 'default');
    }
  }); // copy code

  var BTN_COPY_SELECTOR = '#copy-code';
  var clipboard = new Clipboard(BTN_COPY_SELECTOR, {
    text: function text() {
      return htmlEditor.getValue();
    }
  });
  var timer;
  clipboard.on('success', function (e) {
    e.clearSelection();
    $(BTN_COPY_SELECTOR).text('Succeed!');
    clearTimeout(timer);
    timer = setTimeout(function () {
      $(BTN_COPY_SELECTOR).text('Copy');
    }, 2000);
  });
  clipboard.on('error', function (e) {
    e.clearSelection();
    $(BTN_COPY_SELECTOR).text('Failed!');
    clearTimeout(timer);
    timer = setTimeout(function () {
      $(BTN_COPY_SELECTOR).text('Copy');
    }, 2000);
  }); // run code

  $('#execute').on('click', function () {
    syncCode(htmlEditor.getValue());
  });
})();