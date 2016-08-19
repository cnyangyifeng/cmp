<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>category</#assign>
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
                        <div class="right item">
                            <div class="ui basic icon button" id="pre-delete-button" tabindex="0"><i class="trash outline icon"></i></div>
                            <div class="ui small inverted modal" id="delete-modal">
                                <div class="header">确认继续操作</div>
                                <div class="content">确认本次 <b>删除</b> 操作请点击「 确定 」按钮，取消请点击「 返回 」按钮。</div>
                                <div class="actions">
                                    <div class="ui primary button" id="delete-button">确定</div>
                                    <div class="ui deny basic button">返回</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="work-control ui grid">
                        <div class="worksheet column">
                            <table class="ui very padded unstackable table">
                                <thead>
                                <tr>
                                    <th colspan="3">分类</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="collapsing">名称</td>
                                    <td class="collapsing">
                                        <div class="ui right corner labeled input">
                                            <input type="hidden" id="category-id-input" value="${category.categoryId?c}">
                                            <input id="category-name-input" value="${category.categoryName}" placeholder="请输入名称" tabindex="1">
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
                                            <input id="serial-number-input" value="${category.serialNumber?c}" placeholder="请输入序号" tabindex="1">
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