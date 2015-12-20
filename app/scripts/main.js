const myApp = myApp || {};

$(document).ready(function ready() {
  $('html').removeClass('hidden');
  $('article.back').find('button').click(function click() {
    const $this = $(this);
    const jobName = $this.attr('data-name');
    const jobDescription = $this.attr('data-description');
    const $jobDetail = $('.job-detail');
    $jobDetail.addClass('active');
    $('.job-list').removeClass('active');
    $jobDetail.find('h2').text(jobName);
    $jobDetail.find('p').text(jobDescription);
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
    console.log(to, cc, cooptant, jobName);
  });
});
