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
