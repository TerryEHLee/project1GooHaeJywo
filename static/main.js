// 포스팅박스 버튼
function open_box() {
  $("#post-box").show();
}
function close_box() {
  $("#post-box").hide();
}

// 트레일러 버튼
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
        let image = a['image']; //image_URL!


        let temp_html = `<div class="col" data-bs-toggle="modal" data-bs-target="#exampleModal-${m_id}">
                            <div class="card">
                            <div class="imageBox">
                              <img src="${image}" class="card-img-top" alt="...">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p>${age}</p>
                                <p>${residence}</p>
                                
                                </div> 
                            </div>
                            </div>
                          
                        <div class="modal fade" id="exampleModal-${m_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">MEMBER PROFILE</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body modal-body-display">
                    
                            <div class="member-image-container">
                              <img src="${image}" alt="please check the image" class="member-image"/>          
                            </div>
                    
                            <div class="member-content-container">
                                <h5>MEMBER TMI</h5>
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
                          </div>
                        </div>
                    </div>`;

        $("#cards-box").append(temp_html);
      });
    });
}

//팀원글 Create
function posting() {
  //password가 다르면 포스팅 불가능.
  if ($("#password").val() != 1111) {
    alert('패스워드가 틀립니다.')
  } else {
  let name = $("#name").val();
  let age = $("#age").val();
  let residence = $("#residence").val();
  let food = $("#food").val();
  let mbti = $("#mbti").val();
  let selfdesc = $("#selfdesc").val();
  let respect = $("#respect").val();
  let recentmovie = $("#recentmovie").val();
  let trailer =$('#trailer').val()
  let image = $('#image').val();

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
  formData.append("image_give", image);

  fetch("/teammate", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      window.location.reload();
    });
  }
}

//응원댓글 Get
function listingComment() {
  fetch('/commenter').then((res) => res.json()).then((data) =>{
    let rows = data['result']
    $('#comment-box').empty()
    rows.forEach((a) => {
      let nickname = a['nickname']
      let comment = a['comment']
      let r_id = a['r_id']; 
      console.log(comment)
      
      let temp_htmlL = `<div class="cmt">
                        <div class="card-body">
                          <blockquote class="blockquote mb-0">
                            <p>${comment}</p>
                          <footer class="blockquote-footer">${nickname}</footer>                        
                        </blockquote>
                        <button type="button" class="btn btn-outline-danger cmt-modify-btn"
                          id="comment_delete" name="${nickname}" onclick="comment_delete('${nickname}')">댓글 삭제</button>
                        <button type="button" class="btn btn-outline-danger cmt-modify-btn" onclick="modifyComment(${r_id})">댓글 수정</button>

                        
                        </div>
                      </div>`
      $('#comment-box').prepend(temp_htmlL)
    })
  })
}

//응원댓글 Create
function postingComment() {
  let nickname = $('#nickname').val();
  let comment = $('#comment').val();
  
  let formData = new FormData();
  formData.append("nickname_give",nickname);
  formData.append("comment_give",comment);
  fetch('/commenter', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
      alert(data['msg'])

      window.location.reload()
  })
}

// 응원댓글 update (r_id 정보를 사용하여 댓글 특정)
function modifyComment(r_id) {
  let modifiedComment = prompt('댓글을 수정하세요.', '');
  
  if (modifiedComment) {
    let formData = new FormData();
    formData.append("comment_give", modifiedComment);
    formData.append("replace", "true"); // replace parameter를 사용한다는데 아직 이해 못함.

    fetch(`/commenter/${r_id}`, { method: "POST", body: formData }) // POST 메서드 사용
      .then((res) => res.json())
      .then((data) => {
        alert(data["msg"]);
        window.location.reload();
      });
  }
}


//응원글 작성란 버튼으로 여닫기
function open_textBox() {
  $('#form').show();
}
function close_textBox() {
  $('#form').hide();
}

//팀소개 버튼으로 여닫기
function open_teamInfo() {
  console.log("열리니")
  let obj = document.getElementById("team-info");

  if(obj.style.display == "none") {
    obj.style.display = "block"
  } else {
    obj.style.display = "none"
  }
}
function close_textBox() {
  $('#form').hide();
}

// 댓글 삭제
function comment_delete(nickname) {
  console.log(nickname)
  let formData = new FormData();
  formData.append("nickname_give",nickname);
  fetch('/comment_delete', { method: "POST", body: formData }).then((res) => res.json()).then((data) => {
      alert(data['msg'])
      //새로고침
      window.location.reload()
  })
}

function myFunction(x) {
  x.classList.toggle("change");
}

const commentsPerPage = 3; // Number of comments to display per page
let currentPage = 1; // Current page number
let commentsData = []; // Variable to store the comments data

// Function to render the comments for the current page
function renderComments(comments) {
  const commentBox = document.getElementById('comment-box');
  commentBox.innerHTML = ''; // Clear existing comments

  comments.forEach((comment) => {
    const { nickname, comment: text } = comment;

    const commentItem = document.createElement('div');
    commentItem.className = 'cmt';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const blockquote = document.createElement('blockquote');
    blockquote.className = 'blockquote mb-0';

    const commentText = document.createElement('p');
    commentText.textContent = text;

    const footer = document.createElement('footer');
    footer.className = 'blockquote-footer';
    footer.textContent = nickname;

    blockquote.appendChild(commentText);
    blockquote.appendChild(footer);
    cardBody.appendChild(blockquote);
    commentItem.appendChild(cardBody);

    commentBox.appendChild(commentItem);
  });
}

// Function to handle specific page
function handlePage(pageNumber) {
  currentPage = pageNumber;
  renderComments(paginate(commentsData, commentsPerPage, currentPage));
}

// Function to handle pagination
function handlePagination(comments) {
  const pagination = document.getElementsByClassName('pagination')[0];
  pagination.innerHTML = ''; // Clear pagination

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const previousButton = createPageLink('Previous', handlePrevPage);
  pagination.appendChild(previousButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = createPageLink(i, () => handlePage(i));
    pagination.appendChild(pageLink);
  }

  const nextButton = createPageLink('Next', handleNextPage);
  pagination.appendChild(nextButton);
}

// Function to create a page link
function createPageLink(label, onClick) {
  const pageItem = document.createElement('li');
  pageItem.className = 'page-item';

  const pageLink = document.createElement('a');
  pageLink.className = 'page-link';
  pageLink.href = '#';
  pageLink.textContent = label;
  pageLink.addEventListener('click', onClick);

  pageItem.appendChild(pageLink);

  return pageItem;
}

// Function to handle previous page
function handlePrevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderComments(paginate(commentsData, commentsPerPage, currentPage));
  }
}

// Function to handle next page
function handleNextPage() {
  const totalPages = Math.ceil(commentsData.length / commentsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderComments(paginate(commentsData, commentsPerPage, currentPage));
  }
}

// Function to paginate the comments array
function paginate(arr, itemsPerPage, pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return arr.slice(startIndex, endIndex);
}

// Function to fetch comments data and initialize pagination
function fetchComments() {
  fetch('/commenter')
    .then((res) => res.json())
    .then((data) => {
      commentsData = data.result;
      handlePagination(commentsData);
      renderComments(paginate(commentsData, commentsPerPage, currentPage));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Initialize the page
fetchComments();