function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

// Create Card 모달 열기
document.getElementById("createCardBtn").onclick = function () {
    openCreateCardModal();
};

// Update Card 모달 열기
document.getElementById("updateCardBtn").onclick = function () {
    openUpdateCardModal();
};

// Create Column 모달 열기
document.getElementById("createColumnBtn").onclick = function () {
    openCreateColumnModal();
};

// Update Column 모달 열기
document.getElementById("updateColumnBtn").onclick = function () {
    openUpdateColumnModal();
};

// Create Board 모달 열기
document.getElementById("createBoardBtn").onclick = function () {
    openCreateBoardModal();
};

// Update Board 모달 열기
document.getElementById("updateBoardBtn").onclick = function () {
    openUpdateBoardModal();
};

/******************************************************************/
function createBoard() {
    alert("Create Board");
    $("#modalCreateBoard").modal("hide");
}

function createColumn() {
    alert("Create Column");
    $("#modalCreateColumn").modal("hide");
}

function updateBoard() {
    alert("Update Board");
    $("#modalUpdateBoard").modal("hide");
}

function updateColumn() {
    alert("Update Column");
    $("#modalUpdateColumn").modal("hide");
}

function createCard() {
    alert("Create Card");
    $("#modalCreateCard").modal("hide");
}

function updateCard() {
    alert("Update Card");
    $("#modalUpdateCard").modal("hide");
}
