<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>create-category</#assign>
<#assign page>
<div class="page content">
    <div class="ui grid container">
        <div class="row">
            <div class="side-nav-admin three wide column">
                <@sidenav.content id/>
            </div>
            <div class="workspace thirteen wide column">
                <div class="content">
                    <a class="ui header" href="<@spring.url "/views/categories"/>">分类管理</a>
                    <div class="ui hidden divider"></div>
                    <div class="actionbar ui text menu">
                        <div class="item">
                            <a class="ui basic button" href="<@spring.url "/views/categories"/>">返回上页</a>
                        </div>
                    </div>
                    <div class="work-control ui grid">
                        <div class="worksheet column">
                            <table class="ui very padded unstackable table">
                                <thead>
                                <tr>
                                    <th colspan="3">添加新分类</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="collapsing">名称</td>
                                    <td class="collapsing">
                                        <div class="ui right corner labeled input">
                                            <input id="category-name-input" placeholder="请输入名称" tabindex="1">
                                            <div class="ui right corner label">
                                                <i class="asterisk icon"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="hidden ui left pointing orange basic label" id="category-name-message-label"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="collapsing">序号</td>
                                    <td class="collapsing">
                                        <div class="ui right corner labeled input">
                                            <input id="serial-number-input" placeholder="请输入序号" tabindex="1">
                                            <div class="ui right corner label">
                                                <i class="asterisk icon"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="hidden ui left pointing orange basic label" id="serial-number-message-label"></div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="actionbar ui text menu">
                        <div class="item">
                            <div class="ui primary button" id="save-button" tabindex="1">保存</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</#assign>
<#include "layouts/admin.ftl"/>