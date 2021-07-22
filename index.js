
//화면을 그리는 역할
const render = data => {
  let table = document.querySelector('#tbodyId')

  let dataPerPage = 10; //한 페이지에 나타낼 데이터 개수
  let totalData = data.length; //총 데이터 개수
  let pageGroup = 10; //하단에 표시될 페이지 개수
  let totalPageGroup = Math.ceil(totalData / pageGroup); // 하단에 표시될 총 페이지 개수
  let totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 개수
  // let startIndex = (currentPage - 1) * dataPerPage;
  // let endIndex = startIndex + 10;

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


  const renderData = (data,sidx) => { //10개씩 끊어서

    for (let i = 0; i < 10; i++) { //질문 json column index로 가져오는 법

      $('#' + String(i + 1)).children('#num1').text(data[i+sidx].num)
      $('#' + String(i + 1)).children('#num2').text(data[i+sidx].title)
      $('#' + String(i + 1)).children('#num3').text(data[i+sidx].author)
      $('#' + String(i + 1)).children('#num4').text(data[i+sidx].date)
      $('#' + String(i + 1)).children('#num5').text(data[i+sidx].type)
      $('#' + String(i + 1)).children('#num6').text(data[i+sidx].ip_address)
    }
  }

  renderData(data, 0)
  //페이징 넘버
  const paging = () => {
    let pageNum = document.querySelector('#pagingNum');
    let startPage = `<a href = '#'>처음</a>`
    let prevPage = `<a href = '#'>이전</a>`
    let nextPage = `<a href = '#'>다음</a>`
    let endPage = `<a href = '#'>마지막</a>`

    $(pageNum).append(startPage)
    $(pageNum).append(prevPage)
    for (let j = 0; j < totalPageGroup; j++) {
      pageNum.innerHTML += `<a href = '#' value= '${j + 1}'> ${j + 1} </a>`;
    }
    $(pageNum).append(prevPage)
    $(pageNum).append(endPage)

    let pageSelector = document.querySelectorAll('a');
    pageSelector.forEach((target) => {
      target.addEventListener('click', e => {

        console.log(e.target.innerText);

        renderData(data,(parseInt(e.target.innerText)-1)*10)

      })
    })
  }
  paging();
};

//데이터를 부르는 역할
const loader = url => {
  return $.getJSON(url, render);
};



loader('/table.json');

//to do list
//선택한 페이지 넘버 크게
//처음 이전 다음 마지막 evt

