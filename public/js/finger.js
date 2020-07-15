$(document).ready(function() {
    $(".finger-up").submit(function(e) {
      e.preventDefault();
  
      var chalId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "" + chalId + "/finger-up",
        success: function(data) {
          console.log("up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  
    $(".finger-down").submit(function(e) {
      e.preventDefault();
  
      var chalId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "" + chalId + "/finger-down",
        success: function(data) {
          console.log("down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  });