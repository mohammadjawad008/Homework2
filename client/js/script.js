var main = function (toDoObjects) {
    "use strict";

    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });

    $("#nav-tabs a").toArray().forEach(function (element) {
        var $element = $(element);

        $element.on("click", function () {
            var $content;

            $("#nav-tabs a").removeClass("active");
            $element.addClass("active");
            $("#tabs_content").children().hide(); 
            
            
            switch($element.index()){
                case 0: 
                    $content = $('<tbody>');
                    for (i = toDos.length - 1; i >= 0; i--) {
                        var tmp = $("<tr>");
                        tmp.append($("<th>").text(i));
                        tmp.append($("<th>").text(toDos[i]));
                        $content.append(tmp);
                    }
                    
                    $("#tab_newest table tbody").remove();
                    $("#tab_newest table").append($content);
                    $('#tab_newest').show();
                    break;
                    
                case 1:
                    var i = 1;
                    $content = $('<tbody>');
                    toDos.forEach(function (todo) {
                        var tmp = $("<tr>");
                        tmp.append($("<th>").text(i++));
                        tmp.append($("<th>").text(todo));
                        $content.append(tmp);
                    });
                    $("#tab_oldest table tbody").remove();
                    $("#tab_oldest table").append($content);
                    $('#tab_oldest').show();
                    break;
                    
                case 2:
                    var tags = [];
                    $("#tab_tags").children().remove();
                    toDoObjects.forEach(function (toDo) {
                        toDo.tags.forEach(function (tag) {
                            if (tags.indexOf(tag) === -1) {
                                tags.push(tag);
                            }
                        });
                    });

                    var tagObjects = tags.map(function (tag) {
                        var toDosWithTag = [];

                        toDoObjects.forEach(function (toDo) {
                            if (toDo.tags.indexOf(tag) !== -1) {
                                toDosWithTag.push(toDo.description);
                            }
                        });

                        return {
                            "name": tag,
                            "toDos": toDosWithTag
                        };
                    });

                    tagObjects.forEach(function (tag) {
                        var $tagName = $("<h3>").text(tag.name),
                            $content = $("<ul>");
                        
                            tag.toDos.forEach(function (description) {
                            var $li = $("<li>").text(description);
                            $content.append($li);
                        });
                        
                        $("#tab_tags").append($tagName);
                        $("#tab_tags").append($content);
                        
                    });
                    $('#tab_tags').show();
                    break;
                    
                case 3:
                    $("#add_button").on("click", function () {
                        var description = $("#description").val(),
                            tags = $("#tags").val().split(","),
                            newToDo = {
                                "description": description,
                                "tags": tags
                            };
                        $.post("todos", newToDo, function (result) {
                            toDoObjects.push(newToDo);   
                            toDos = toDoObjects.map(function (toDo) {
                                return toDo.description;
                            });
                            $("#description").val("");
                            $("#tags").val("");
                        });
                    });
                    
                    
                    $('#tab_add').show();
                    
                    break;
            }

            return false;
        });
    });

    $("#nav-tabs a:first-child").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
