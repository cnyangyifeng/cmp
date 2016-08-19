<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>index</#assign>
<#assign page>
<div class="page content">
    <div class="ui grid container">
        <div class="row">
            <div class="side-nav-admin three wide column">
                <@sidenav.content id/>
            </div>
            <div class="workspace thirteen wide column">
                <div class="content">
                    <div class="ui header">运营数据</div>
                    <div class="ui hidden divider"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</#assign>
<#include "layouts/admin.ftl"/>