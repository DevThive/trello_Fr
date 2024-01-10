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

//보드 수정 기능
async function updateBoard(boardid) {
    const formData = new FormData(document.getElementById("updateBoardform"));

    console.log(formData.get("upboardcolor"));

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
