function addStyle(css)
{
  var retVal = false;
  const sheet = getStyleSheet();
  if(findStyle(css) < 0)
  {
    css = normalizeRule(css);
    if(css) // make sure the rule is valid before adding it
    {
      // append the rule to the end of the style sheet
      sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
      retVal = true;
    }
  }
  else
  {
    console.warn("Style already exists - not added");
  }
  
  return retVal;
}

function getStyleTag()
{
  const myStyleId = "myAddedStyle0815";
  var style = document.getElementById(myStyleId);
  if(style == null)
  {
    style = document.createElement('style');
    style.type = 'text/css';
    style.id = myStyleId;
    document.head.appendChild(style);
  }
  return style;
}

function getStyleSheet()
{
  const
    tag = getStyleTag(),
    sheet = (tag.sheet || tag.styleSheet);
  return sheet;
}

function normalizeRule(css)
{
  // create a temporary style tag and get its style sheet object
  var style = document.createElement('style');
  style.type = 'text/css';
  // style tag needs to be added to DOM to make its style sheet accessible
  document.head.appendChild(style);
  var sheet = (style.sheet || style.styleSheet);
  // now that we have the style sheet, we can remove the style tag again
  style.remove();
  
  var retVal = false;
  try
  {
    var i = sheet.insertRule(css);
    retVal = sheet.rules[i].cssText;
  }
  catch(e)
  {
    console.error("Invalid css rule: " + css + "\n\terror: " + e);
  }
  
  return retVal;
}

function findStyle(css)
{
  var retVal = -1;
  const sheet = getStyleSheet(),
    rules = (sheet.rules || sheet.cssRules);

  /* saved rules are reformatted, so to find it,
     we need to apply the reformatting to the rule
     we ant to find. */
  css = normalizeRule(css);
  
  if(css) // rule is valid
  {
    for (var i=0; i < rules.length; i++)
    {
      if(rules[i].cssText == css)
      {
        retVal = i;
        break;
      }
    }
  }
  
  return retVal;
}

function deleteStyle(css)
{
  var retVal = false;
  const sheet = getStyleSheet();
  var i = findStyle(css);
  if(i >= 0)
  {
    sheet.removeRule(i);
    retVal = true;
  }
  else
  {
    console.warn("Style to be deleted does not exist");
  }
  
  return retVal;
}

function toggleStyle(css)
{
  var retVal = false;
  if(findStyle(css) >= 0)
  {
    retVal = deleteStyle(css);
  }
  else
  {
    retVal = addStyle(css);
  }
  
  return retVal;
}
