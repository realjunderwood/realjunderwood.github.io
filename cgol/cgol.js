render();

function render(clear) {
  var width = 12;
  var height = 12;

  $("#table").empty();
  for (i = 0; i < height; i++) {
    var tr = document.createElement("tr");
    $(tr).appendTo("#table");
  }
  for (j = 0; j < width; j++) {
    var td = document.createElement("td");
    $("tr").append(td);
  }
  assign();
}

function assign() {
  $("td").each(function() {
    $(this).data("x", $(this).index() + 1);
    $(this).data("y", $(this).parent().index() + 1);
  });
}

$("td").click(function() {
  $(this).addClass("alive");
});

//edar: evaluate, destroy, and reproduce
function edar() {
  var deathQueue = [];

  $("td").each(function() {
    if (aliveNeighbors($(this)) === 3) {
      $(this).addClass("alive");
    }

    if (aliveNeighbors($(this)) < 2 || aliveNeighbors($(this)) > 3) {
      if ($(this).hasClass("alive")) {
        deathQueue.push($(this));
      }
    }
  });
  deathQueue.forEach(function(element) {
    element.removeClass("alive");
  });
}

$("#go").click(function() {
  assign();
  /*$("#stop").prop("disabled", false);
  $("#go").prop("disabled", true);*/
  setInterval(edar, 1);
});

/*$("#stop").click(function() {
  $("#stop").prop("disabled", true);
  $("#go").prop("disabled", false);
  clearInterval();
});*/

function aliveNeighbors(element) {
  var count = [];
  count.push(element.parent().prev().children().eq(element.index()).hasClass("alive"));
  count.push(element.parent().prev().children().eq(element.index()).prev().hasClass("alive"));
  count.push(element.parent().prev().children().eq(element.index()).next().hasClass("alive"));
  count.push(element.parent().next().children().eq(element.index()).hasClass("alive"));
  count.push(element.parent().next().children().eq(element.index()).prev().hasClass("alive"));
  count.push(element.parent().next().children().eq(element.index()).next().hasClass("alive"));
  count.push(element.prev().hasClass("alive"));
  count.push(element.next().hasClass("alive"));

  return count.filter(function(x) {
    return x === true;
  }).length;
}
