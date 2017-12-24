var todolist = [];

function createItem(value) {
    var obj_todolist = {
        todo: "",
        done: false
    }
    obj_todolist.todo = value;
    todolist.push(obj_todolist);

    //保存数据到缓存中
    saveData();

    loadData();


}
//删除项目
function deleteItem(i) {
    todolist.splice(i, 1);

    //保存数据到缓存中
    saveData();

    loadData();

}

function updateItem(i, value, done) {
    todolist[i].todo = value;
    todolist[i].done = done;

    //保存数据到缓存中
    saveData();

}
//获取数据
function getData() {
    var data = localStorage.getItem("mytodolist");
    if (data != null) {
        return JSON.parse(data);
    } else {
        return [];
    }
}
//改变项目状态
function changeState(i) {
    todolist[i].done = !todolist[i].done;
    saveData();

    loadData();

}
//保存数据
function saveData() {
    var data = JSON.stringify(todolist);
    localStorage.setItem("mytodolist", data);
}

//加载数据
function loadData() {
    todolist = getData();
    if (todolist != null) {
        var todoString = "";
        var doneString = "";
        var todocount = 0;
        var donecount = 0;
        for (var i = 0; i < todolist.length; i++) {
            if (!todolist[i].done) {
                todoString += "<li>" +
                    "<input type=\"checkbox\" onchange=\"changeState(" + i + ")\">" +
                    "<span id=\"span_" + i + "\"onclick=\"edittodolist(" + i + ",'" + todolist[i].todo + "')\">" + todolist[i].todo + "</span>" +
                    "<span class=\"del\" id=\"" + i + "\" onclick=\"deleteItem(" + i + ")\">删除</span>" +
                    "</li>";
                todocount++;
            } else {
                doneString += "<li>" +
                    "<input type=\"checkbox\" onchange=\"changeState(" + i + ")\" checked=\"checked\">" +
                    "<span id=\"span_" + i + "\"onclick=\"edittodolist(" + i + ",'" + todolist[i].todo + "')\">" + todolist[i].todo + "</span>" +
                    "<span class=\"del\" id=\"" + i + "\" onclick=\"deleteItem(" + i + ")\">删除</span>" +
                    "</li>";
                donecount++;
            }
        }

        document.getElementById("todocount").innerText = todocount;
        document.getElementById("donecount").innerText = donecount;
        var eltodo = document.getElementById("todolist");
        var eldone = document.getElementById("donelist");
        eltodo.innerHTML = todoString;
        eldone.innerHTML = doneString;
    }
}

//回车添加功能
function addtodolist() {
    var addlist = document.getElementById("addList");
    addlist.onfocus = function() {
        addlist.onkeydown = function(event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                createItem(this.value);
                this.value = "";
            }
        }
    }
}
//
function edittodolist(i, value) {

    loadData();
    var input_out = document.getElementById("span_" + i);
    //var insert = "<input type=\"text\" id=\"input_" + i + "\" value=\"" + value + "\" onblur=\"edittodolistset(" + i + ")\">";
    var insert = "<input type=\"text\" id=\"input_" + i + "\" value=\"" + value + "\" >";

    input_out.innerHTML = insert;

    var newinput = document.getElementById("input_" + i);

    newinput.focus();
    newinput.onblur = function(e) {
        edittodolistset(i, this.value);
    }






}

function edittodolistset(i, value) {
    //console.log(i + value + todolist[i].done);
    updateItem(i, value, todolist[i].done);



    loadData();
}

window.onload = function() {
    //绑定回车添加功能
    addtodolist();
    loadData();
}