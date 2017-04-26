// load the mindmap
$(document).ready(function() {
  // enable the mindmap in the body
  $('body').mindmap();

  var addChild = function(child, parent) {
    var label = '';
    if (child.Entity != undefined) {
      label = child.Entity + '<p>' + child.Director + '</p>';
    } else {
      label = child.School + '<p>' + child.City + ', ' + child.State + '</p>';
    }
    var mynode = $('body').addNode(parent, label, {
      href: '/',
      onclick: function(node) {
        $(node.obj.activeNode.content).each(function() {
          this.hide();
        });
        $(node.content).each(function() {
          this.show();
        });
      }
    });
    $(this).hide();
    if (child.children != undefined)
      for (var i = 0; i < child.children.length; i++)
        addChild(child.children[i], mynode);
  }

  // load the json
  $.getJSON('data.json', function(data) {
    var root = $('body').addRootNode(data.Entity, {
      href: '/',
      url: '/',
      onclick: function(node) {
        $(node.obj.activeNode.content).each(function() {
          this.hide();
        });
      }
    });

    if (data.children != undefined)
      for (var i = 0; i < data.children.length; i++)
        addChild(data.children[i], root);
  });

});
