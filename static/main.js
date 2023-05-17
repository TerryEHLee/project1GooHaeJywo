function open_box() {
  $("#post-box").show();
}
function close_box() {
  $("#post-box").hide();
}

function open_trailer() {
  $('.trailer-box').show()
}
function close_trailer() {
  $('.trailer-box').hide()
}

$(document).ready(function () {
  listing();
});

$(document).ready(function () {
  listingComment();
});

//팀원글 Get
function listing() {
  fetch("/teammate")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      $("#cards-box").empty();
      rows.forEach((a) => {
        let name = a["name"];
        let age = a["age"];
        let residence = a["residence"];
        let food = a["food"];
        let mbti = a["mbti"];
        let selfdesc = a["selfdesc"];
        let respect = a["respect"];
        let recentmovie = a["recentmovie"];
        let m_id = a["m_id"];
        let trailer = a['trailer'].substring(a['trailer'].indexOf("=") + 1); //trailer URL에서 유튜브ID만 따옴



        let temp_html = `<div class="mycards">
                                     <div class= id="cards-box">
                                      <!-- 카드 클릭하면 모달창 열림(data-bs-toggle 부터 "#exampleModal"까지의 코드임)-->
                                          <div class="col" data-bs-toggle="modal" data-bs-target="#exampleModal-${m_id}">
                                              <div class="card h-100">
                                                  <img src="https://t1.daumcdn.net/cfile/tistory/991688365C91ACC827" class="card-img-top">
                                                  <div class="card-body">
                                                      <h5 class="card-title">${name}</h5>
                                                      <p>${age}</p>
                                                      <p>${residence}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>


                                      <div class="modal fade" id="exampleModal-${m_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                      <div class="modal-dialog modal-dialog-scrollable modal-xl">
                                      <div class="modal-content">
                                          <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">멤버 프로필</h5>
                                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div class="modal-body modal-body-display">
                                  
                                          <div class="member-image-container">
                                              <img src="https://t1.daumcdn.net/cfile/tistory/991688365C91ACC827" alt="please check the image" class="member-image"/>            
                                          </div>
                                  
                                          <div class="member-content-container">
                                              <h5>멤버 TMI</h5>
                                              <ul>
                                              <li class="member-content">
                                              이름?
                                              <h6>${name}</h6>
                                              </li>
                                              <li class="member-content">
                                              나이?
                                              <h6>${age}</h6>
                                              </li>
                                              <li class="member-content">
                                              사는 곳?
                                              <h6>${residence}</h6>
                                              </li>
                                              <li class="member-content">
                                              가장 좋아하는 음식?
                                              <h6>${food}</h6>
                                              </li>
                                              <li class="member-content">
                                              나의 MBTI 는?
                                              <h6>${mbti}</h6>
                                              </li>
                                              <li class="member-content">
                                              나를 한마디로 표현한다면?
                                              <h6>${selfdesc}</h6>
                                              </li>
                                              <li class="member-content">
                                              존경하는 인물은?
                                              <h6>${respect}</h6>
                                              </li>
                                              <li class="member-content">
                                              가장 최근에 본 영화는?
                                              <h6>${recentmovie}</h6>
                                              <!--트레일러 여는 버튼-->
                                              <span>
                                                <i class="trailer_button fa-brands fa-youtube" onclick="open_trailer()"></i>
                                              </span>
                                            
                                              <!-- display:none은 처음에는 트레일러가 안 보이게 함. trailer-box는 id로 줄 경우 unique한 값을 줘야 하므로 class로 지정-->
                                              <div class="trailer-box" style="display: none">
                                                  <iframe 
                                                      width=100% height=300px 
                                                      src="https://www.youtube.com/embed/${trailer}" 
                                                      title="YouTube video player" frameborder="0" 
                                                      allow="accelerometer; autoplay; clipboard-write; 
                                                      encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                                  </iframe>
                                                  <!--트레일러 닫는 버튼-->
                                                  <div class="trailer-closebtn">
                                                  <button onclick="close_trailer()" type="button" class="btn btn-outline-dark">닫기</button>
                                                  </div>
                                              </div>
                                              </ul>
                                  
                                          </div>
                                          </div>
                                          <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          <button type="button" class="btn btn-primary">Save changes</button>
                                          </div>
                                      </div>
                                      </div>
                                  </div>`;

        $("#cards-box").append(temp_html);
      });
    });
}

//팀원글 Create
function posting() {
  let name = $("#name").val();
  let age = $("#age").val();
  let residence = $("#residence").val();
  let food = $("#food").val();
  let mbti = $("#mbti").val();
  let selfdesc = $("#selfdesc").val();
  let respect = $("#respect").val();
  let recentmovie = $("#recentmovie").val();

  let trailer = $('#trailer').val()

  let formData = new FormData();
  formData.append("name_give", name);
  formData.append("age_give", age);
  formData.append("residence_give", residence);
  formData.append("food_give", food);
  formData.append("mbti_give", mbti);
  formData.append("selfdesc_give", selfdesc);
  formData.append("respect_give", respect);
  formData.append("recentmovie_give", recentmovie);

  formData.append("trailer_give", trailer);

  fetch("/teammate", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
}

//응원댓글 Get
function listingComment() {
  fetch('/commenter').then((res) => res.json()).then((data) => {
    let rows = data['result']
    $('#comment-box').empty()
    rows.forEach((a) => {
      let comment = a['comment']
      console.log(comment)

      let temp_htmlL = `<div class="cmt">
                          <p>${comment}</p>
                        </div>`
      $('#comment-box').prepend(temp_htmlL)
    })
  })
}

//응원댓글 Create
function postingComment() {
  let comment = $('#comment').val()
  let formData = new FormData();
  formData.append("comment_give", comment);
  fetch('/commenter', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
    alert(data['msg'])

    window.location.reload()
  })
}