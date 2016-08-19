<#import "/spring.ftl" as spring/>
<#import "lib/sidenav.ftl" as sidenav/>
<#assign id>logs</#assign>
<#assign page>
<div class="page content">
    <div class="ui grid container">
        <div class="row">
            <div class="side-nav-admin three wide column">
                <@sidenav.content id/>
            </div>
            <div class="workspace thirteen wide column">
                <div class="content">
                    <div class="ui header">操作记录</div>
                    <div class="ui hidden divider"></div>
                    <div class="ui text actionbar menu">
                        <div class="item">
                            <div class="ui button">下载表格</div>
                        </div>
                        <div class="item">
                            <div class="ui floating dropdown icon black basic button">
                                <span class="text">全部类型</span>
                                <i class="dropdown icon"></i>
                                <div class="menu">
                                    <div class="item">全部类型</div>
                                    <div class="item">非常重要</div>
                                    <div class="item">重要</div>
                                    <div class="item">普通</div>
                                </div>
                            </div>
                        </div>
                        <div class="right item">
                            <div class="ui action input">
                                <input class="search" type="text" placeholder="事件">
                                <div class="ui secondary primary button">搜索</div>
                            </div>
                        </div>
                    </div>
                    <table class="ui very padded unstackable table">
                        <thead>
                        <tr>
                            <th>
                                <div class="ui checkbox">
                                    <input type="checkbox">
                                    <label>事件</label>
                                </div>
                            </th>
                            <th class="collapsing">时间</th>
                            <th class="collapsing">类型</th>
                            <th class="center aligned collapsing">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div class="ui checkbox">
                                    <input type="checkbox">
                                    <label>用户登录</label>
                                </div>
                            </td>
                            <td class="collapsing">2016-07-01 14:15</td>
                            <td class="collapsing">非常重要</td>
                            <td class="center aligned collapsing">
                                <a href="log.html">查看</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="ui checkbox">
                                    <input type="checkbox">
                                    <label>用户注册</label>
                                </div>
                            </td>
                            <td class="collapsing">2016-07-10 18:00</td>
                            <td class="collapsing">非常重要</td>
                            <td class="center aligned collapsing">
                                <a href="log.html">查看</a>
                            </td>
                        </tr>
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
            </div>
        </div>
    </div>
</div>
</#assign>
<#include "layouts/admin.ftl"/>