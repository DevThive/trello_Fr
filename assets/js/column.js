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
            // console.log(response.data);

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
            //컬럼 생성 버튼
            columnbtn.innerHTML += `<button onclick="createColumnform(${boardid})" id="boardBtn">Add a Column...</button>`;
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
    console.log(boardid);
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
    console.log(columnid);
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
