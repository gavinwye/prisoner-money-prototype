module.exports = function (router, content) {

  router.post('/credits/', function (req, res) {
    res.redirect('/credits/results')
  })

  // This is for the credits data
  router.get('/credits/', function(req, res) {
    // location of credit data json file
    var creditData = require('../../data/credits_list.json');
    res.render('credits/index',
    {
      credits: creditData
    });
  });

  // This is for the credits data
  router.get('/credits/results', function(req, res) {
    // location of credit data json file
    var creditData = require('../../data/credits_list.json');
    let terms = (req.session.data.creditSearch || '').trim().split(/\s+/).map(term => term.toLowerCase())
    let credits = creditData.filter(function (credit) {
      for (let term of terms) {
        for (let field of [credit.payment_source_email, credit.prisoner_number, credit.payment_source_name]) {
          if ((field || '').toLowerCase().indexOf(term) >= 0) {
            return true
          }
        }
      }
      return false
    })
    res.render('credits/results',
    {
      credits: credits
    });
  });

  // END__######################################################################################################
}
