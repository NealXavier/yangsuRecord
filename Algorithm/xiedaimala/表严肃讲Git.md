表严肃讲Git
===
1.创建仓库

 - 本地创建
        git init demo 初始化到一个自定义文件夹 这时候demo底下会有一个.git文件
 - 远程拖拽
        git clone https://github.com/biaoyansu.com/15.x.git 克隆项目
    
    PS:记笔记：ctrl+L 可以清屏

2.基本用法
- git add .  将修改内容加入缓存区 
- git commit -m "说明"  提交修改后给文件内容做说明方便查找
- git status 对文件状态进行查找
        这时候会出现几种状态：
            _No commit yet_ 是说还没提交
            _Untracked file_ 是说存在未被追踪的文件(ps:新建文件没有通过git init 的方式创建)
            _modified_ 是说存在未被追踪的已经修改的文件(修改之后没有提交)
            _change to be committed_ 是说更改已被提交 
- git log 
        查看git提交的日志(ps:如果通过add.和commit命令之后发现没有日志没有记录这个节点应当注意是不是没有按"保存"按钮)
        如果git日志的记录太多可以通过jk键选择向前向后

        ps: 如果git log 命令太长的话可以用git log --oneline
            如果觉得有必要拿到每个节点的身份识别号的话可以用git log --oneline --all

3.三种状态(modified staged committed)

- modified 这是文件本身修改的内容(没有进入暂存区的(git add .)))

- staged 通过 git add .命令的

- committed 已经提交的

    ps：git log -p 可以看到'修改的具体内容' 

4.tag标签(给标签打上tag标签都是为了版本发布)
- git tag -a $tagName -m    $memoContent:添加tag

- git tag :罗列tag

- git show $tagName 显示tag信息

- git checkout $tagName 回到tag所在

5.分支branch

- 应用场景：当项目上线之后发现前期有bug忘记fix,这时候可以branch生成分支进行fix,在救火的过程中也不会影响到项目的进度,fix完之后再merge

- branch相关命令：     
				     git branch $branchName : 创建分支       
					 git checkout $branchName :切换到分支           
					 git log --all --graph :简单的图形化显示

6.合并分支    
 - 首先切换节点:git checkout '节点身份证'
 - 创建新的节点: git checkout -b "分支点名字"
 - 编写修复的内容后提交
 - 于此同时master主支继续开发,继续提交新的内容
 - 使用命令：git merge $branchName(这是在主支上进行操作的)
 - 通过git log --oneline --graph --all查看分支合并
 - 过程应该会出现内容冲突(conflict),这时候应该重新改动内容后再提交

7.远程仓库
- git remote add $remoteName $giturl  :添加仓库
- git push -u $remoteName $branchName :push到远程分支
- git remote -v                       :远程仓库url
- git clone $giturl                   :克隆
  		1.origin
  		2.master                  
