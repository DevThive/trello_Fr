// app.js
const boardListDiv = document.getElementById("board-list");
const boardDataDiv = document.getElementById("board-data");
const columnbtn = document.getElementById("columnBtn");

window.onload = function () {
    axios
        .get("/user/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const boards = response.data.boards;

            boards.forEach((board) => {
                boardListDiv.innerHTML += `
                    <div>
                        <li style="background-color: ${board.background}" onclick="updateBoardData(${board.id})" class="board-item">
                            ${board.title}
                            <div class="dropdown">
                                <button class="dropbtn">메뉴</button>
                                <div class="dropdown-content">
                                    <a onclick="deleteColumn()">삭제</a>
                                    <a onclick="updateBoardform(${board.id})">수정</a>
                                </div>
                            </div>
                        </li>
                    </div>`;
            });

            boardListDiv.innerHTML += `
                <div>
                    <button onclick="createBoardform()" id="boardBtn">
                        Add a board...
                    </button>
                </div>`;

            columnbtn.innerHTML = ``;

            // ... (계속됨)
        })
        .catch(function (error) {
            console.log(error);
        });
};

//컴럼 조회
async function updateBoardData(boardid) {
    boardDataDiv.innerHTML = ``;
    columnbtn.innerHTML = ``;

    axios
        .get("/boards/" + boardid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const columns = response.data.columns;

            columns.forEach((column, index) => {
                boardDataDiv.innerHTML += `
                    <div>
                        <div draggable="true" class="column">
                            <h3>${column.title}
                                <div style="display: flex">
                                    <div class="dropdown">
                                        <button class="dropbtn">메뉴</button>
                                        <div class="dropdown-content">
                                            <a onclick="deleteColumn(${column.id})">삭제</a>
                                            <a onclick="updateColumnform(${column.id})">수정</a>
                                        </div>
                                    </div>
                                </div>
                            </h3>
                            <div id="card-data-${index}"></div>
                        </div>
                        <div>
                            <button onclick="createCardform(${column.id})" id="cardBtn">Add a card...</button>
                        </div>
                    </div>`;
                setTimeout(() => {
                    updateCardData(column.id, index);
                }, 0);
            });

            columnbtn.innerHTML += `<button onclick="createColumnform(${boardid})" id="boardBtn">Add a Column...</button>`;

            // ... (계속됨)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// app.js
const boardListDiv = document.getElementById("board-list");
const boardDataDiv = document.getElementById("board-data");
const columnbtn = document.getElementById("columnBtn");

window.onload = function () {
    axios
        .get("/user/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const boards = response.data.boards;

            boards.forEach((board) => {
                boardListDiv.innerHTML += `
                    <div>
                        <li style="background-color: ${board.background}" onclick="updateBoardData(${board.id})" class="board-item">
                            ${board.title}
                            <div class="dropdown">
                                <button class="dropbtn">메뉴</button>
                                <div class="dropdown-content">
                                    <a onclick="deleteColumn()">삭제</a>
                                    <a onclick="updateBoardform(${board.id})">수정</a>
                                </div>
                            </div>
                        </li>
                    </div>`;
            });

            boardListDiv.innerHTML += `
                <div>
                    <button onclick="createBoardform()" id="boardBtn">
                        Add a board...
                    </button>
                </div>`;

            columnbtn.innerHTML = ``;

            // ... (계속됨)
        })
        .catch(function (error) {
            console.log(error);
        });
};

//컴럼 조회
async function updateBoardData(boardid) {
    boardDataDiv.innerHTML = ``;
    columnbtn.innerHTML = ``;

    axios
        .get("/boards/" + boardid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const columns = response.data.columns;

            columns.forEach((column, index) => {
                boardDataDiv.innerHTML += `
                    <div>
                        <div draggable="true" class="column">
                            <h3>${column.title}
                                <div style="display: flex">
                                    <div class="dropdown">
                                        <button class="dropbtn">메뉴</button>
                                        <div class="dropdown-content">
                                            <a onclick="deleteColumn(${column.id})">삭제</a>
                                            <a onclick="updateColumnform(${column.id})">수정</a>
                                        </div>
                                    </div>
                                </div>
                            </h3>
                            <div id="card-data-${index}"></div>
                        </div>
                        <div>
                            <button onclick="createCardform(${column.id})" id="cardBtn">Add a card...</button>
                        </div>
                    </div>`;
                setTimeout(() => {
                    updateCardData(column.id, index);
                }, 0);
            });

            columnbtn.innerHTML += `<button onclick="createColumnform(${boardid})" id="boardBtn">Add a Column...</button>`;

            // ... (계속됨)
        })
        .catch(function (error) {
            console.log(error);
        });
}

//카드 생성폼
function createCardform(columnid) {
    const createcard = document.getElementById("createCard");

    createcard.innerHTML = `
        <form id="createCardform" method="POST">
            <label for="name">이름:</label><br>
            <input type="text" id="crcardname" name="crcardname"><br>
            
            <label for="content">내용:</label><br>
            <textarea id="crcardcontent" name="crcardcontent"></textarea><br>

            <label for="color">색상:</label><br>
            <input type="color" id="crcardcolor" name="crcardcolor"><br>

            <label for="deadline">마감일:</label><br>
            <input type="datetime-local" id="crcarddeadline" name="crcarddeadline"><br>

            <input type="button" onclick="createCard(${columnid})" value="등록">
        </form>`;
}

//카드 수정폼
function updateCardform(cardid) {
    const updatecard = document.getElementById("updateCard");

    axios
        .get("/cards/" + cardid, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            const cardinfo = response.data;
            let date = new Date(cardinfo.deadline);
            let formattedDate = date.toISOString().split(".")[0];

            updatecard.innerHTML = `
                <form id="updateCardform" method="POST">
                    <label for="name">이름:</label><br>
                    <input type="text" id="upcardname" name="upcardname" value="${cardinfo.name}"><br>
                    
                    <label for="content">내용:</label><br>
                    <textarea id="upcardcontent" name="upcardcontent">${cardinfo.content}</textarea><br>
            
                    <label for="color">색상:</label><br>
                    <input type="color" id="upcardcolor" name="upcardcolor" value="${cardinfo.color}><br>
            
                    <label for="deadline">마감일:</label><br>
                    <input type="datetime-local" id="upcarddeadline
                    //카드 수정 기능
                    async function updateCard(cardid) {
                        const formData = new FormData(document.getElementById("updateCardform"));
                        let date = new Date(formData.get("upcarddeadline"));
                        let formattedDate = date.toISOString().split(".")[0];
                    
                        axios
                            .patch(
                                "/cards/" + cardid,
                                {
                                    name: formData.get("upcardname"),
                                    content: formData.get("upcardcontent"),
                                    color: formData.get("upcardcolor"),
                                    deadline: formattedDate,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                    },
                                },
                            )
                            .then(function (response) {
                                console.log(response.data);
                                alert("수정이 완료되었습니다.");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    
                    //컬럼 삭제
                    async function deleteColumn(columnid) {
                        axios
                            .delete("/columns/" + columnid, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                },
                            })
                            .then(function (response) {
                                alert("삭제되었습니다.");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                    
                    // 컬럼 생성폼
                    function createColumnform(boardid) {
                        const createcolumn = document.getElementById("createCloumn");
                    
                        createcolumn.innerHTML = `
                            <form id="createColumnform" method="POST">
                                <label for="name">Column Name:</label><br>
                                <input type="text" id="crcolumntitle" name="crcolumntitle"><br>
                                <input type="button" onclick="createColumn(${boardid})" value="등록">
                            </form>
                        `;
                    }
                    
                    // 컬럼 생성(기능)
                    async function createColumn(boardid) {
                        const formData = new FormData(document.getElementById("createColumnform"));
                    
                        axios
                            .post(
                                "/columns",
                                {
                                    title: formData.get("crcolumntitle"),
                                    boardId: boardid,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                    },
                                },
                            )
                            .then(function (response) {
                                alert("Column 생성 완료");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                            });
                    }
                    
                    // 컬럼 수정폼
                    function updateColumnform(columnid) {
                        const createcolumn = document.getElementById("createCloumn");
                    
                        axios
                            .get("/columns/" + columnid, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                },
                            })
                            .then(function (response) {
                                const columninfo = response.data;
                    
                                createcolumn.innerHTML = `
                                    <form id="updateColumnform" method="POST">
                                        <label for="name">Column Name:</label><br>
                                        <input type="text" id="crcolumntitle" name="crcolumntitle" value="${columninfo.title}" ><br>
                                        <input type="button" onclick="updateColumn(${columnid})" value="수정">
                                    </form>
                                `;
                            });
                    }
                    
                    //컬럼 수정 기능
                    async function updateColumn(columnid) {
                        const formData = new FormData(document.getElementById("updateColumnform"));
                    
                        axios
                            .put(
                                "/columns/" + columnid,
                                {
                                    title: formData.get("crcolumntitle"),
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                    },
                                },
                            )
                            .then(function (response) {
                                alert("(Column) 수정 되었습니다.");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                            });
                    }
                    
                    // 보드 추가폼
                    function createBoardform() {
                        const createboard = document.getElementById("createBoard");
                    
                        createboard.innerHTML = `
                            <form id="createBoardform" method="POST">
                                <label for="name">Title:</label><br>
                                <input type="text" id="crboardtitle" name="crboardtitle"><br>
                    
                                <label for="color">Color:</label><br>
                                <input type="color" id="crboardcolor" name="crboardcolor"><br>
                    
                                <label for="content">Desc:</label><br>
                                <textarea id="crboarddesc" name="crboarddesc"></textarea><br>
                            
                                <input type="button" onclick="createBoard(${boardid})" value="등록">
                            </form>
                        `;
                    }
                    
                    // 보드 생성(기능)
                    async function createBoard() {
                        const formData = new FormData(document.getElementById("createBoardform"));
                    
                        axios
                            .post(
                                "/boards",
                                {
                                    title: formData.get("crboardtitle"),
                                    background: formData.get("crboardcolor"),
                                    description: formData.get("crboarddesc"),
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                    },
                                },
                            )
                            .then(function (response) {
                                alert("(board) 등록이 완료되었습니다.");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                            });
                    }
                    
                    //보드 수정 폼
                    function updateBoardform(boardid) {
                        const updateboard = document.getElementById("updateBoard");
                    
                        axios
                            .get("/boards/" + boardid, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                },
                            })
                            .then(function (response) {
                                const boardinfo = response.data;
                    
                                updateboard.innerHTML = `
                                    <form id="updateBoardform" method="POST">
                                        <label for="name">Title:</label><br>
                                        <input type="text" id="upboardtitle" name="upboardtitle" value="${boardinfo.title}"><br>
                    
                                        <label for="color">Color:</label><br>
                                        <input type="color" id="upboardcolor" name="upboardcolor" value="${boardinfo.background}"><br>
                    
                                        <label for="content">Desc:</label><br>
                                        <textarea id="upboarddesc" name="upboarddesc">${boardinfo.description}</textarea><br>
                                    
                                        <input type="button" onclick="updateBoard(${boardid})" value="등록">
                                    </form>
                                `;
                            });
                    }
                    
                    async function updateBoard(boardid) {
                        const formData = new FormData(document.getElementById("updateBoardform"));
                    
                        axios
                            .put(
                                "/boards/" + boardid,
                                {
                                    title: formData.get("upboardtitle"),
                                    background: formData.get("upboardcolor"),
                                    description: formData.get("upboarddesc"),
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                    },
                                },
                            )
                            .then(function (response) {
                                alert("(board) 수정 성공하였습니다.");
                                window.location.reload();
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                            });
                    }
                    
