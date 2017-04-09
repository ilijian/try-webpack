举个例子，例如欧洲商城需要有业务A，印度商城业务B，其他商城业务C，那么对应于项目开发就只是呈现三种业务模式，与商城无关

${{#Business_A}}
Code for business A
${{/Business_A}}

${{#Business_B}}
Code for business B
${{/Business_B}}

${{#Business_C}}
Code for business C
${{/Business_C}}

这样在CMS中会产生3个变量：Business_A、Business_B、Business_C，其中Business_A仅在欧洲商城有值，Business_B仅在印度商城有值，Business_C仅在其他商城有值