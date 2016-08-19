<#import "/spring.ftl" as spring/>
<#import "../lib/head.ftl" as head/>
<#import "../lib/scripts.ftl" as scripts/>
<!doctype html>
<html>
<head>
<@head.meta/>
<title>管理平台</title>
<@head.link/>
<link rel="stylesheet" type="text/css" href="<@spring.url "/static/styles/cmp/${id}.css"/>">
</head>
<body id="${id}">
${page?trim}
<@scripts.content/>
<script src="<@spring.url "/static/scripts/cmp/${id}.js"/>"></script>
</body>
</html>