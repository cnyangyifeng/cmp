<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>tags</#assign>
<#assign page>
<div class="page content">
    <div class="ui grid container">
        <div class="row">
            <div class="side-nav-admin three wide column">
                <@sidenav.content id/>
            </div>
            <div class="workspace thirteen wide column">
                <div class="content">
                    <div class="ui header">标签管理</div>
                    <div class="ui hidden divider"></div>
                    <div class="actionbar ui text menu">
                        <div class="item">
                            <div class="ui primary button">添加新标签</div>
                        </div>
                        <div class="item">
                            <div class="ui basic icon button"><i class="trash outline icon"></i></div>
                        </div>
                        <div class="right item">
                            <div class="ui action input">
                                <input class="search" type="text" placeholder="名称">
                                <div class="ui secondary primary button">搜索</div>
                            </div>
                        </div>
                    </div>
                    <div class="hint ui attached segment">
                        <div class="ui breadcrumb">
                            <div class="section">显示结果</div>
                            <div class="divider">:</div>
                            <div class="section">全部</div>
                        </div>
                    </div>
                    <div class="work-control ui grid">
                        <div class="worksheet twelve wide column">
                            <table class="ui very padded unstackable table">
                                <thead>
                                <tr>
                                    <th class="collapsing">
                                        <div class="ui checkbox">
                                            <input type="checkbox">
                                            <label>名称</label>
                                        </div>
                                    </th>
                                    <th class="collapsing">分类</th>
                                    <th>序号</th>
                                    <th class="collapsing">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <#list tags as tag>
                                <tr>
                                    <td class="collapsing">
                                        <div class="ui checkbox">
                                            <input type="checkbox">
                                            <label>${tag.tagName}</label>
                                        </div>
                                    </td>
                                    <td class="collapsing">${tag.categoryName}</td>
                                    <td>${tag.serialNumber}</td>
                                    <td class="collapsing">
                                        <a href="<@spring.url "/tag"/>">查看</a>
                                    </td>
                                </tr>
                                </#list>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th colspan="4">
                                        <div class="ui pagination menu">
                                            <a class="item"><i class="angle left icon"></i> 上一页</a>
                                            <a class="active item">1</a>
                                            <a class="item">2</a>
                                            <a class="item">3</a>
                                            <a class="item">4</a>
                                            <a class="item">5</a>
                                            <a class="item">6</a>
                                            <a class="item">7</a>
                                            <a class="item">8</a>
                                            <a class="item">9</a>
                                            <a class="item">10</a>
                                            <a class="item">下一页 <i class="angle right icon"></i></a>
                                        </div>
                                    </th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="filter four wide column">
                            <div class="ui fluid secondary vertical menu">
                                <a class="active item"><i class="list icon"></i> 全部分类</a>
                                <#list categories as category>
                                    <a class="level two item">${category.categoryName}</a>
                                </#list>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</#assign>
<#include "layouts/admin.ftl"/>