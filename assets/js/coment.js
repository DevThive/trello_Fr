// 댓글 조회
async function getComments(cardId) {
    try {
        const response = await axios.get(`/comments/cards/${cardId}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        const comments = response.data;
        console.log(comments);
    } catch (error) {
        console.error(error);
    }
}

// 댓글 작성
async function createComment(cardId, commentContent) {
    try {
        const response = await axios.post(
            `/comments/cards/${cardId}/comments`,
            {
                comment: commentContent,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        );
        const createdComment = response.data;
        console.log(createdComment);
    } catch (error) {
        console.error(error);
    }
}

// 댓글 수정
async function updateComment(commentId, updatedContent) {
    try {
        const response = await axios.patch(
            `/comments/${commentId}`,
            {
                comment: updatedContent,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            },
        );
        const updatedComment = response.data;
        console.log(updatedComment);
    } catch (error) {
        console.error(error);
    }
}

// 댓글 삭제
async function deleteComment(commentId) {
    try {
        const response = await axios.delete(`/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        console.log("댓글이 삭제되었습니다.");
    } catch (error) {
        console.error(error);
    }
}

// 댓글 확인
async function checkComment() {
    try {
        const response = await axios.post("/comments/check", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        const userData = response.data;
        console.log(userData);
    } catch (error) {
        console.error(error);
    }
}

// 댓글 모달 표시
async function showCommentsModal(cardId) {
    try {
        const response = await axios.get(`/comments/cards/${cardId}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        const comments = response.data;

        const commentModalBody = document.getElementById("commentModalBody");
        commentModalBody.innerHTML = "";

        comments.forEach((comment) => {
            commentModalBody.innerHTML += `<p>${comment.content}</p>`;
        });
        /**************************************************************************************************/
        // 댓글 모달 열기
        $("#commentModal").modal("show");
    } catch (error) {
        console.error(error);
    }
}
$(document).ready(function () {
    // 서버에서 사용자 닉네임을 가져오는 부분은 생략됨
    var userNickname = "사용자"; // 서버에서 받아온 사용자 닉네임을 사용

    // 댓글 폼을 제출할 때의 동작을 정의합니다
    $("#commentForm").submit(function (event) {
        event.preventDefault();
        var commentText = $("#comment").val();
        var timestamp = new Date().toLocaleString();

        // 댓글 목록에 새로운 댓글을 추가합니다
        $("#commentList").append(
            "<div class='comment-item'>" +
                "<p class='comment-nickname'>" +
                userNickname +
                "</p>" +
                "<p class='comment-text'>" +
                commentText +
                "</p>" +
                "<p class='timestamp'>등록 시간: " +
                timestamp +
                "</p>" +
                "<button type='button' class='btn btn-custom btn-edit'>수정</button>" +
                "<button type='button' class='btn btn-custom btn-delete'>삭제</button>" +
                "</div>",
        );
        $("#comment").val(""); // 댓글 입력란을 비웁니다
        // 모달은 닫지 않습니다.
    });

    // 댓글 수정 버튼을 클릭할 때의 동작을 정의합니다
    $(document).on("click", ".btn-edit", function () {
        var commentItem = $(this).closest(".comment-item");
        var commentText = commentItem.find(".comment-text").text();
        $("#comment").val(commentText); // 수정할 댓글을 입력란에 설정합니다
        commentItem.hide(); // 기존 댓글을 숨깁니다
        // 모달은 닫지 않습니다.
    });

    // 댓글 삭제 버튼을 클릭할 때의 동작을 정의합니다
    $(document).on("click", ".btn-delete", function () {
        $(this).closest(".comment-item").remove();
        // 모달은 닫지 않습니다.
    });
});
