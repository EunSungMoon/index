
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
        createTd.class = `black`
        createTr.appendChild(createTd);
      }
      table.appendChild(createTr);
    }
  }
  renderTable();

  //페이징
  const paging = () => {
    let pageNum = document.querySelector('#pagingNum');
    let startPage = `<a href = '#' id='start'>처음</a>`
    let prevPage = `<a href = '#' id='prev'>이전</a>`
    let nextPage = `<a href = '#' id="next">다음</a>`
    let endPage = `<a href = '#' id="end">마지막</a>`

    $(pageNum).append(startPage);
    $(pageNum).append(prevPage);

    for (let j = 0; j < totalPage; j++) {
      pageNum.innerHTML += `<span href = '#' id= '${j + 1}' class='list'>${j + 1} </span>`;
    }
    $(pageNum).append(nextPage);
    $(pageNum).append(endPage);
  }
  paging();

  const renderData = (data, sidx, currentPage) => { //테이블에 json 값 넣기 sidx:10개씩 

    let firstIndex = data[0].num //첫번째 인덱스
    let lastIndex = totalData - dataPerPage + 1 //총데이터
    let prevPage=currentPage-1;
    let nextPage=currentPage+1;



    for (let i = 0; i < totalPage; i++) { //질문 json column index로 가져오는 법

      $('#' + String(i + 1)).children('#num1').text(data[i + sidx].num)
      $('#' + String(i + 1)).children('#num2').text(data[i + sidx].title)
      $('#' + String(i + 1)).children('#num3').text(data[i + sidx].author)
      $('#' + String(i + 1)).children('#num4').text(data[i + sidx].date)
      $('#' + String(i + 1)).children('#num5').text(data[i + sidx].type)
      $('#' + String(i + 1)).children('#num6').text(data[i + sidx].ip_address)
    }

    let pageSelector1 = document.querySelectorAll('a')
    pageSelector1.forEach((target, currentPage) => {
      target.addEventListener('click', e => {
        

        // let prevPage = parseInt(e.target.id) - parseInt(1)
        // let nextPage = parseInt(e.target.id) + parseInt(1)
        // let prevPage=data[(e.target.id-1)].num;
        // let nextPage=currentPage+1

        if (e.target.id == "start") {
          renderData(data, firstIndex - 1, currentPage - 1);
        }
        else if (e.target.id == "prev") {
          renderData(data, (prevPage+1) * dataPerPage, currentPage - 1);
          console.log(e.target.id);
        }
        else if (e.target.id == "next") {
          renderData(data, (nextPage+1) * dataPerPage, currentPage - 1);
          console.log(e.target.id);
        }
        else if (e.target.id == "end") {
          renderData(data, lastIndex - 1, currentPage - 1);
        }
      })
    })


    let pageSelector2 = document.querySelectorAll('span');
    pageSelector2.forEach((target, currentPage) => { //페이징 이벤트
      target.addEventListener('click', e => {
        console.log(currentPage+1);
        renderData(data, ((e.target.innerText) - 1) * dataPerPage, currentPage - 1); //인덱스가 10개씩 되도록 안그럼 2페이지에 2번부터 나와
        e.target.style.color = "red"
        // $('.list').addClass('red')
        // return $('.list').removeClass('red')
      })
    })
  }
  renderData(data, 0 * 10, 1);
}

//데이터를 부르는 역할
const loader = url => {
  return $.getJSON(url, render);
};
loader('/table.json');