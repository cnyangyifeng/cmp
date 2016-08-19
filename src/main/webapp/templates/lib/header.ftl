<#import "/spring.ftl" as spring/>
<#macro content active>
<div class="page header">
    <div class="site-nav-admin">
        <div class="ui attached menu">
            <div class="ui container">
                <a class="header item" href="<@spring.url "/"/>">
                    <i class="circular inverted yoast icon"></i> cnmengma.com
                </a>
                <div class="right menu">
                    <a class="${(active=='messages')?then('active item','item')}" href="<@spring.url "/messages"/>">我的消息
                        <div class="ui small orange basic label">8</div>
                    </a>
                    <a class="${(active=='profile')?then('active item','item')}" href="<@spring.url "/profile"/>">杨义锋</a>
                    <a class="item" href="<@spring.url "/login"/>">退出</a>
                </div>
            </div>
        </div>
    </div>
</div>
</#macro>