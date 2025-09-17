$(function () {
  /********* BTN FUNCTION *********/
  $('[data-btn]').click(function (e) {
    let btn_vals = $(this).data('btn').toString().split(',');
    btn_vals.forEach(function (btn_val) {
      $(`[data-toggle=${btn_val.trim()}]`).toggleClass('on');
    });
  });


  $('.popup_close').click(function () {
    let this_pop = $(this).closest('.popup');
    this_pop.removeClass('on');
    this_pop.closest('.popup').find('input:not([type="submit"], [type="button"])').val("");
  });

  // 팝업이 뜨면 모든 컨텐츠의 클릭 막기
  setInterval(() => {
    if ($('.popup.on').length) {
      $('#contents').addClass('lock');
    } else {
      $('#contents').removeClass('lock');
    }
  }, 100);

  /********* LNB *********/
  $('#lnb li:not(.on) .dep1').click(function () {
    $(this).siblings('.dep2').slideToggle(300);
  });

  /********* 메인노출 여부버튼 토글링 *********/
  $('.main_view_btn').click(function () {
    $(this).toggleClass('on');
  });

  /********* 게시판 전체체크 기능 *********/
  $('.board_wrap').each(function (index, item) {
    let this_board = $(this);
    // 전체 체크박스 클릭 시
    $(this).find('.chk_all').on('click', function () {
      const isChecked = $(this).is(':checked');
      this_board.find('input[type="checkbox"]').prop('checked', isChecked);
    });

    // 개별 체크박스 클릭 시
    $(this).find('input').on('click', function () {
      const totalItems = this_board.find('input:not(.chk_all)').length;
      const checkedItems = this_board.find('input:not(.chk_all):checked').length;
      this_board.find('.chk_all').prop('checked', totalItems === checkedItems);
    });
  });

  /********* 파일 업로드 인풋 커스텀 *********/
  $('input[type="file"]').each(function () {
    $(this).on('change', function () {
      const fileName = this.files[0] ? this.files[0].name : '선택된 파일 없음';
      $(this).siblings('.file_name').text(fileName);
    });
  });

  /********* 패스워드 보이기 버튼 *********/
  $('.pw_show_btn').on('click', function () {
    let pw_slot = $(this).closest('.write_slot.password');
    pw_slot.toggleClass('show');

    if (pw_slot.hasClass('show') == true) {
      pw_slot.find('input').attr('type', "text");
    }
    else {
      pw_slot.find('input').attr('type', 'password');
    }
  });

  /********* 엑셀업로드 팝업 임시기능 스크립트 *********/
  let excel_pop_img_slot = $('.popup[data-toggle=pop_excel] .img_upload .img_upload_slot');
  let excel_pop_img_list = $('.popup[data-toggle=pop_excel] .img_upload .img_upload_list');

  function excel_pop_return() {
    excel_pop_img_slot.show();
    excel_pop_img_list.hide();
    excel_pop_img_slot.find('.img_upload_btn input[type=file]').val("");
  }

  excel_pop_img_slot.find('.img_upload_btn input[type=file]').on('change', function () {
    const excel_file = $(this).prop('files')[0];
    if (excel_file) {
      excel_pop_img_slot.hide();
      excel_pop_img_list.show();
    } else {
      excel_pop_return();
    }
  });

  $('.popup[data-toggle=pop_cancel_excel] [data-btn="pop_excel"]').click(function () {
    excel_pop_return();
  });

  /********* 토스트버튼 나타나면 3초 후에 사라지는 기능 *********/
  $('.toast_popup').each(function () {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'class') {
          const target = $(mutation.target);
          if (target.hasClass('on')) {
            setTimeout(function () {
              target.removeClass('on');
            }, 3000);
          }
        }
      });
    });

    observer.observe(this, {
      attributes: true,
      attributeFilter: ['class']
    });
  });



  /********* 뒤로가기 버튼 *********/
  $('.back_btn').on('click', function (e) {
    e.preventDefault();
    history.back();
  });

  /********* 검색 기간 버튼 *********/
  const periodButtons = document.querySelectorAll('.period_button');

  periodButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isActive = button.classList.contains('active');

      periodButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      if (!isActive) {
        button.classList.add('active');
      }
    });
  });
});