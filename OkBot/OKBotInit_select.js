

try{
  var code = loader.GetAdditionalData() + _.template($("#OKBotInit_code").html())({})
  code = Normalize(code,0)
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e)
{}