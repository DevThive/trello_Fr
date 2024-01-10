//초대 부분
function inviteUser() {
    const userinfo = document.getElementById("usersinfo");
    userinfo.innerHTML = ``;

    axios
        .get("/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        .then(function (response) {
            userlist = response.data;
            console.log(userlist);

            userlist.forEach((user) => {
                userinfo.innerHTML += `
                    <tr>
                    <th scope="row">${user.name}</th>
                    <td>${user.email}</td>
                    <td><button onclick="invite()">초대하기</button></td>
                    </tr>
                `;
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function invite() {
    const userId = document.getElementById("userIdInput").value;
    const boardId = document.getElementById("boardIdInput").value;
    InviteUser(userId, boardId);
}

async function InviteUser(userId, boardId) {
    axios
        .post(
            `/invited-users/${userId}/${boardId}`,
            {
                userId: userId,
                boardId: boardId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        )
        .then(function (response) {
            alert("(invited-users) 유저초대에 성공하였습니다.");
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
}
