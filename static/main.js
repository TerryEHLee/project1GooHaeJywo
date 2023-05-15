$(function () {
    posting();
});

function posting() {
    let name = $('#name').val()
    let age = $('#age').val()
    let hobby = $('#hobby').val()
    let mbti = $('#mbti').val()
    let image = $('#image').val()
    let myfavoriteURL = $('#myfavoriteURL').val()

    let formData = new FormData();
    formData.append("name_give", name);
    formData.append("age_give", age);
    formData.append("hobby_give", hobby);
    formData.append("mbti_give", mbti);
    formData.append("image_give", image);
    formData.append("myfavoriteURL_give", myfavoriteURL);

    fetch('/teammate_posting', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
        alert(data['msg'])
        // 새로고침
        window.location.reload()
    })
}