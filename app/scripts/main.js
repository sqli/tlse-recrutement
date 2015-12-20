$(document).ready(function ready() {
  const sendReadToAnalytics = function sendAnalytics(jobName){
    ga('set', {
      page: '/'+jobName,
      title: jobName
    });
    ga('send', 'pageview');
  };
  const sendPostuleToAnalytics = function sendAnalytics(jobName){
    ga('send', {
      hitType: 'event',
      eventCategory: 'Job',
      eventAction: 'Postule',
      eventLabel: jobName
    });
  };
  $('article.back').find('button').click(function click() {
    const $this = $(this);
    const jobName = $this.attr('data-name');
    const jobDescription = $this.attr('data-description');
    const $jobDetail = $('.job-detail');
    $jobDetail.addClass('active');
    $('.job-list').removeClass('active');
    $jobDetail.find('h2').text(jobName);
    $jobDetail.find('p').text(jobDescription);
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
    const cc = ['rcomadelperier@sqli.com'];
    const cooptant = 'Robin COMA DELPERIER';
    const jobName = $(this).parent().find('h2').text();
    sendPostuleToAnalytics(jobName);
    sendMail(to, cc, cooptant, jobName);
  });
});
