(function() {
    'use strict';
    var tasker = {
        init: function() {
            this.cacheDom();
            this.bindEvents();
            this.evalTasklist();
        },
        cacheDom: function() {
            this.taskInput = document.getElementById("input-task");
            this.addBtn = document.getElementById("add-task-btn");
            this.tasklist = document.getElementById("tasks");
            this.tasklistChildren = this.tasklist.children;
            this.errorMessage = document.getElementById("error");
        },
        bindEvents: function() {
            this.addBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);
        },
        evalTasklist: function() {
            var i, chkBox, delBtn;
            // CLIQUE EVENTOS A ELEMENTOS
            for (i = 0; i < this.tasklistChildren.length; i += 1) {
                // ADICIONE EVENTO DE CLIQUE ÀS CHECKBOXES
                chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
                chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
                // ADICIONE EVENTO DE CLIQUE PARA EXCLUIR O BOTÃO
                delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
                delBtn.onclick = this.delTask.bind(this, i);
            }
        },
        render: function() {
            var taskLi, taskChkbx, taskVal, taskBtn, taskTrsh;
            // CONSTRUIR HTML
            taskLi = document.createElement("li");
            taskLi.setAttribute("class", "task");
            // CHECKBOX
            taskChkbx = document.createElement("input");
            taskChkbx.setAttribute("type", "checkbox");
            // TAREFA DO USUÁRIO
            taskVal = document.createTextNode(this.taskInput.value);
            // DELETE BUTTON
            taskBtn = document.createElement("button");
            // ÍCONE DE LIXO
            taskTrsh = document.createElement("i");
            taskTrsh.setAttribute("class", "fa fa-trash");
            // INSERIR LIXEIRA NO BOTÃO
            taskBtn.appendChild(taskTrsh);

            // ANEXAR ELEMENTOS À LISTA DE TAREFAS
            taskLi.appendChild(taskChkbx);
            taskLi.appendChild(taskVal);
            taskLi.appendChild(taskBtn);

            // ADICIONE TAREFA À LISTA DE TAREFAS
            this.tasklist.appendChild(taskLi);

        },
        completeTask: function(i, chkBox) {
            if (chkBox.checked) {
                i.className = "task completed";
            } else {
                this.incompleteTask(i);
            }
        },
        incompleteTask: function(i) {
            i.className = "task";
        },
        enterKey: function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                this.addTask();
            }
        },
        addTask: function() {
            var value = this.taskInput.value;
            this.errorMessage.style.display = "none";

            if (value === "") {
                this.error();
            } else {
                this.render();
                this.taskInput.value = "";
                this.evalTasklist();
            }
        },
        delTask: function(i) {
            this.tasklist.children[i].remove();
            this.evalTasklist();
        },
        error: function() {
            this.errorMessage.style.display = "block";
        }
    };

    tasker.init();
}());