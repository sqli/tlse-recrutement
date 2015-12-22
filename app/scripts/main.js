$(document).ready(function ready() {
  const getCooptant = function getCooptant() {
    const list = [{
      name: 'Robin COMA DELPERIER',
      mail: 'rcomadelperier@sqli.com',
    }];
    return list[0];
  };
  const sendReadToAnalytics = function sendAnalytics(jobName) {
    ga('set', {
      page: '/' + jobName,
      title: jobName,
    });
    ga('send', 'pageview');
  };
  const sendPostuleToAnalytics = function sendAnalytics(jobName) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Job',
      eventAction: 'Postule',
      eventLabel: jobName,
    });
  };
  const sendMail = function sendMail(to, cooptant, jobName) {
    const APIKEY_PUBLIC = '2OC37AciFIbLN1FrHa2plw';
    $.ajax({
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      type: 'POST',
      data: {
        key: APIKEY_PUBLIC,
        message: {
          from_email: cooptant.mail,
          from_name: cooptant.name,
          to: [{
            email: to,
            type: 'to',
          }, {
            email: cooptant.mail,
            name: cooptant.name,
            type: 'cc',
          }],
          subject: 'RE : ' + jobName,
          html: 'Cette candidature provient d\'une cooptation de ' + cooptant.name + '.',
        },
      },
      success: function success(data) {
        console.log(data);
        sendPostuleToAnalytics(jobName);
      },
      error: function error(err) {
        console.error(err);
      },
    });
  };
  $('article.back').find('button').click(function click() {
    const $this = $(this);
    const jobName = $this.attr('data-name');
    const jobDescription = $this.attr('data-description');
    const jobProfil = $this.attr('data-profil');
    const isWax = $this.attr('data-is-wax') === 'true';
    const $jobDetail = $('.job-detail');
    $jobDetail.addClass('active');
    $('.job-list').removeClass('active');
    $jobDetail.find('.job-name').text(jobName);
    $jobDetail.find('.job-description').text(jobDescription);
    $jobDetail.find('.job-profil').text(jobProfil);
    if (isWax) {
      $jobDetail.find('.job-detail-sqli').hide();
      $jobDetail.find('.job-detail-wax').show();
    } else {
      $jobDetail.find('.job-detail-sqli').show();
      $jobDetail.find('.job-detail-wax').hide();
    }
    sendReadToAnalytics(jobName);
    return false;
  });
  $('.close-job-detail').click(function click() {
    const $jobDetail = $('.job-detail');
    $('.job-list').addClass('active');
    $jobDetail.removeClass('active');
    return false;
  });
  $('.postuler').click(function click() {
    const to = ['rcomadelperier@sqli.com'];
    const jobName = $(this).parent().find('h2').text();
    sendMail(to, getCooptant(), jobName);
  });
});
