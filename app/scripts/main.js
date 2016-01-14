$(document).ready(function ready() {
  const getCooptant = function getCooptant() {
    const list = [{
      name: 'Robin COMA DELPERIER',
      mail: 'rcomadelperier@sqli.com',
      part: 95,
    }, {
      name: 'Olivier Boyer',
      mail: 'oboyer@sqli.com',
      part: 5,
    }];
    const bigTombola = [];
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      for (let it = 0; it < item.part; it++) {
        bigTombola.push(item);
      }
    }
    const randomIntFromInterval = function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return bigTombola[randomIntFromInterval(0, bigTombola.length - 1)];
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
    const subject = encodeURI('RE : ' + jobName);
    const bodyMessage = encodeURI([
      'Bonjour,',
      '\nJe viens vers vous avec le soutien de ' + cooptant.name + ' au sujet du poste : ' + jobName + '.',
      'Vous pouvez trouver mon CV en pièce jointe.',
      '\nJe vous remercie d\'avance de l\'attention que vous porterez à me candidature,',
    ].join('\n'));

    const mailtoLink = 'mailto:' + to + '?cc=' + cooptant.mail + '&subject=' + subject + '&body=' + bodyMessage;
    window.open(mailtoLink, 'emailWindow');
    sendPostuleToAnalytics(jobName);
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
    const to = 'toulouse.recrutement@sqli.com';
    const jobName = $(this).parent().find('h2').text();
    sendMail(to, getCooptant(), jobName);
  });
});
