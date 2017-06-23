function format(d) {
  var parseDate = d3.timeParse("%Y-%m-%d");
  var parseTime = d3.timeParse("%H:%M");

  return  {
    name : d['Name'],
    user : d['User Name'],
    account_date : parseDate(d['Account Creation Date']),
    review_date : parseDate(d['Review Date']),
    review_time : parseTime(d['Review Time']),
    account_age : +d['Account Age'],
    followers : +d['Follower Count'],
    public_repos : +d['Public Repos Owned'],
    repo : d['Repo Name'],
    commit_count : +d['Commit Count'],
    lang : d['Language'],
    lang_count : +d['Language Count'],
    contributors : +d['Contributor Count'],
    commit_mean : +d['Commit Size Mean'],
    commit_std : +d['Commit Size STD'],
    commit_max : +d['Commit Size Max'],
    commit_min : +d['Commit Size Max'],
    addition_mean : +d['Additions Mean'],
    addition_std : +d['Additions STD'],
    addition_max : +d['Additions Max'],
    addition_min : +d['Additions Max'],
    deletions_mean : +d['Deletions Mean'],
    deletions_std : +d['Deletions STD'],
    deletions_max : +d['Deletions Max'],
    deletions_min : +d['Deletions Max'],
    next_step : d['Next Step']
  };
}

var varTypes = {
  name :           { type : 'string', label : 'Candidate Name'},
  user :           { type : 'string', label : 'Github Username'},
  account_date :   { type : 'time', label : 'Github Account Creation Date'},
  review_date :    { type : 'time', label : 'Kata Review Date'},
  review_time :    { type : 'time', label : 'Kata Review Time of Day'},
  account_age :    { type : 'num', label : 'Github Account Age at Review (Days)'},
  followers :      { type : 'num', label : 'Github Followers'},
  public_repos :   { type : 'num', label : 'Number of public Repositories'},
  repo :           { type : 'string', label : 'Kata Repository Name'},
  commit_count :   { type : 'num', label : 'Number of Commits'},
  lang :           { type : 'string', label : 'Kata Language'},
  lang_count :     { type : 'num', label : 'Number of Languages'},
  contributors :   { type : 'num', label : 'Number of Contributors'},
  commit_mean :    { type : 'num', label : 'Mean Commits Size (Lines of Code)'},
  commit_std :     { type : 'num', label : 'Standard Deviation for Commit Size (Lines of Code)'},
  commit_max :     { type : 'num', label : 'Max Commit Size (Lines of Code)'},
  commit_min :     { type : 'num', label : 'Min Commit Size (Lines of Code)'},
  addition_mean :  { type : 'num', label : 'Mean Number of Additions (Lines of Code)'},
  addition_std :   { type : 'num', label : 'Standard Deviation for Additions (Lines of Code)'},
  addition_max :   { type : 'num', label : 'Max Number of Additions (Lines of Code)'},
  addition_min :   { type : 'num', label : 'Min Number of Addition (Lines of Code)'},
  deletions_mean : { type : 'num', label : 'Mean Number of Deletions (Lines of Code)'},
  deletions_std :  { type : 'num', label : 'Standard Deviation for Deletions (Lines of Code)'},
  deletions_max :  { type : 'num', label : 'Max Number of Deletions (Lines of Code)'},
  deletions_min :  { type : 'num', label : 'Min Number of Deletions (Lines of Code)'},
  next_step :      { type : 'string', label : 'Next Step for this Candidate'}
};

var stepDescriptions = {
  pairing : 'Proceed to Pairing',
  resubmit : 'Take Feedback and Resubmit',
  'tech screen' : 'Request a Tech Screening',
  dismiss : 'Dismiss from Interview Process'
};
