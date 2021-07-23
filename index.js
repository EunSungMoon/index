
//화면을 그리는 역할
const render = data => {
  let table = document.querySelector('#tbodyId')
  let dataPerPage = 10; //한 페이지에 나타낼 데이터 개수
  let totalData = data.length; //총 데이터 개수
  let totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 개수

  const renderTable = () => {  //테이블 생성
    for (let i = 0; i < 10; i++) {
      let createTr = document.createElement('tr');
      createTr.id = `${i + 1}`
      for (let j = 0; j < 6; j++) {
        let createTd = document.createElement('td')
        createTd.id = `num${j + 1}`
        createTr.appendChild(createTd)
      }
      table.appendChild(createTr)
    }
  }
  renderTable()

  const renderData = (data, sidx, currentPage) => { //테이블에 json 값 넣기 sidx:10개씩 

    let startIndex = (currentPage - 1) * dataPerPage; //시작 인덱스
    let endIndex = startIndex + 10; //페이지 마지막 인덱스
    let firstIndex = data[0].num //첫번째 인덱스
    let lastIndex = totalData //총데이터
    let prevPage = currentPage - 1;
    let nextPage = currentPage + 1;

    // if (startIndex < firstIndex) { //시작 인덱스< 첫번쨰 인덱스보다 작을 경우 같도록
    //   startIndex = firstIndex;
    // }
    // console.log("비교" + startIndex);

    // if (prevPage < 0) {
    //   prevPage = currentPage
    // }
    // console.log("이전" + prevPage);

    // if (nextPage > totalPage) {
    //   nextPage = totalPage
    // }
    // console.log("다음" + nextPage);

    for (let i = 0; i < totalPage; i++) { //질문 json column index로 가져오는 법

      $('#' + String(i + 1)).children('#num1').text(data[i + sidx].num)
      $('#' + String(i + 1)).children('#num2').text(data[i + sidx].title)
      $('#' + String(i + 1)).children('#num3').text(data[i + sidx].author)
      $('#' + String(i + 1)).children('#num4').text(data[i + sidx].date)
      $('#' + String(i + 1)).children('#num5').text(data[i + sidx].type)
      $('#' + String(i + 1)).children('#num6').text(data[i + sidx].ip_address)
    }
  }

  renderData(data, 0 * 10, 1)

  //페이징
  const paging = () => {
    let pageNum = document.querySelector('#pagingNum');
    let startPage = `<a href = '#' id='1'>처음</a>`
    let prevPage = `<a href = '#' id='prev'>이전</a>`
    let nextPage = `<a href = '#' id="next">다음</a>`
    let endPage = `<a href = '#' id="10">마지막</a>`

    $(pageNum).append(startPage)
    $(pageNum).append(prevPage)
    for (let j = 0; j < 10; j++) {
      pageNum.innerHTML += `<a href = '#' id= '${j + 1}'> ${j + 1} </a>`;
    }
    $(pageNum).append(nextPage)
    $(pageNum).append(endPage)
  }
  paging()

  let pageSelector = document.querySelectorAll('a');
  pageSelector.forEach((target, currentPage) => { //페이징 이벤트
    target.addEventListener('click', e => {

      if(e.target.id=='prev'){
        renderData(data,prevPage,currentPage)
      }
      else if(e.target.id=='next'){
        renderData(data, nextPage,currentPage)
      }
        renderData(data, ((e.target.id) - 1) * dataPerPage, currentPage)
    
      //인덱스가 10개씩 되도록 안그럼 2페이지에 2번부터 나와
      e.target.style.color = "red"
    })
  })


};

//데이터를 부르는 역할
const loader = url => {
  return $.getJSON(url, render);
};
loader('/index/table.json');