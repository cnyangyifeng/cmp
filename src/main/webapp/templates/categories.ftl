<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>categories</#assign>
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
                    <div class="actionbar overlay">
                        <div class="ui text menu">
                            <div class="item">
                                <a class="ui primary button" href="<@spring.url "/views/categories/create"/>">添加新分类</a>
                            </div>
                            <div class="item">
                                <div class="ui disabled icon button" id="pre-delete-button"><i
                                        class="trash outline icon"></i></div>
                                <div class="ui small inverted modal" id="delete-modal">
                                    <div class="header">确认继续操作</div>
                                    <div class="content">确认本次 <b>批量删除</b> 操作请点击「 确定 」按钮，取消请点击「 返回 」按钮。</div>
                                    <div class="actions">
                                        <div class="ui primary button" id="delete-button">确定</div>
                                        <div class="ui deny basic button">返回</div>
                                    </div>
                                </div>
                            </div>
                            <div class="right item">
                                <div class="ui action input">
                                    <input class="search" type="text" placeholder="名称" id="query-input" tabindex="1">

                                    <div class="ui secondary primary button" id="search-button" tabindex="1">搜索</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hint ui attached segment">
                        <div class="ui breadcrumb">
                            <div class="section label">显示结果</div>
                            <div class="divider">:</div>
                            <div class="section label" id="query-keywords-label">全部</div>
                        </div>
                    </div>
                    <div class="work-control ui grid">
                        <div class="worksheet column">
                            <table class="ui padded unstackable table">
                                <thead>
                                <tr>
                                    <th class="collapsing with-min-width">
                                        <div class="master ui checkbox">
                                            <input type="checkbox" id="select-all-checkbox">
                                            <label for="select-all-checkbox">名称</label>
                                        </div>
                                    </th>
                                    <th>序号</th>
                                    <th class="collapsing center aligned with-min-action-width">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="3">数据加载中...</td>
                                </tr>
                                </tbody>
                                <tfoot class="hidden">
                                <tr>
                                    <th colspan="3">
                                        <div class="ui pagination menu" id="pagination-menu"></div>
                                        <div class="count" id="total-count-label"></div>
                                    </th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</#assign>
<#include "layouts/admin.ftl"/>