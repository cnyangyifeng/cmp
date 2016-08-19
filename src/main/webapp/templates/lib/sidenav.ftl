<#import "/spring.ftl" as spring/>
<#macro content active>
<div class="ui fluid vertical secondary menu">
    <div class="header item">管理</div>
    <a class="${(active=='index')?then('active item','item')}" href="<@spring.url "/"/>">运营数据</a>
    <div class="header item">首页</div>
    <a class="${(active=='quick-navs')?then('active item','item')}" href="<@spring.url "/quick-navs"/>">快速导航</a>
    <a class="${(active=='promotions')?then('active item','item')}" href="<@spring.url "/promotions"/>">广告位</a>
    <a class="${(active=='features')?then('active item','item')}" href="<@spring.url "/features"/>">特色功能</a>
    <a class="${(active=='qrcode')?then('active item','item')}" href="<@spring.url "/qrcode"/>">二维码</a>
    <a class="${(active=='feeds')?then('active item','item')}" href="<@spring.url "/feeds"/>">分类信息流</a>
    <div class="header item">设置</div>
    <a class="${(active=='tags')?then('active item','item')}" href="<@spring.url "/views/tags"/>">标签管理</a>
    <a class="${(active=='categories')?then('active item','item')}" href="<@spring.url "/views/categories"/>">分类管理</a>
    <div class="header item">安全</div>
    <a class="${(active=='logs')?then('active item','item')}" href="<@spring.url "/logs"/>">操作记录</a>
</div>
</#macro>