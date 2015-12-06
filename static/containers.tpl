
<div class="panel panel-default">
	<div class="panel-heading clearfix">
		<h4 class="panel-title pull-left" style="padding-top: 7.5px;">Containers <span class='badge'>0</span></h4>
		<div class="btn-group pull-right">
			<a id='dsplyAll' href="#" class="btn btn-info btn-sm"><strong>Display All</strong></a>

			<a id='delImg' href="#" class="btn btn-warning btn-sm" data-loading-text='Deleting'><strong>Delete</strong></a>
			<a href="#imgCrtModal" class="btn btn-default btn-sm" data-toggle='modal'><strong>Create</strong></a>
		</div>
	</div>
		
	<table class="table table-hover table-responsive" id='imgTable'>
		<thead>
			<tr>
				<th><input id='full' type='checkbox' /></th>
				<th>Id</th>
				<th>Names</th>
				<th>Image</th>
				<th>Command</th>
				<th>Created</th>
				<th>Status</th>
				<th>Posrts</th>
			</tr>
		</thead>
		<tbody id='imgTbody'></tbody>
	</table>
</div>

<!-- 链接模态框 -->
<div class="modal" id='imgModal' tabindex='-1'>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<a class="close" data-dismiss='modal'>&times;</a>
				<h5 class='modal-title'>Repository</h5>
			</div>	
			<div class="modal-body">
				<ul class='nav nav-tabs nav-justified'>
					<li class='active'><a href='#tag' data-toggle='tab'>Tag</a></li>
					<!-- <li><a href='#registry' data-toggle='tab'>Registry</a></li> -->
					<li><a href='#history' data-toggle='tab'>History</a></li>
					<li><a href='#inspect' data-toggle='tab'>Inspect</a></li>
				</ul>

				<div class="tab-content">
					<!-- tag标签 -->
					<div class='tab-pane active' id='tag'>
						<form id='tagForm'>
							<div class="form-group">
								<label>Source Tag</label>
								<input class="form-control" id='srcTagIpt' type='text' placeholder='Source Tag' disabled/>
								<input id='srcImgId' type="hidden" name='srcImgId'>
							</div>
							<div class="form-group">
								<label>New Tag</label>
								<input class="form-control" id='newTagIpt' type='text' name='newTag' placeholder='[REGISTRYHOST/][USERNAME/]NAME[:TAG]'/>
							</div>
							<button class='btn btn-default' data-dismiss='modal'>Cancel</button>
							<button class='btn btn-success pull-right' id='tagSubmit'>Submit</button>	
						</form>
					</div>
					<!-- registry标签 -->
					<!-- <div class='tab-pane' id="registry">
						registry
					</div> -->
					<!-- history标签 -->
					<div class='tab-pane' id="history">
						<p></p>
						<div class="panel panel-danger">
						<!-- <div class="panel panel-warning"> -->
							<div class="panel-heading">
								<h4 class="panel-title"></h4>
							</div>
							<table class='table table-condensed table-striped' id='hstrytable'>
								<thead>
									<th>Image</th>
									<th>Created</th>
									<th>Created By</th>
									<th>Size</th>
									<th>Comment</th>
								</thead>
								<tbody id='hstryTbody'></tbody>	
							</table>
						</div>
					</div>
					<!-- inspect标签 -->
					<div class='tab-pane' id="inspect">
						<p></p>
						<div class="panel panel-danger">
						<!-- <div class="panel panel-warning"> -->
							<div class="panel-heading">
								<h4 class="panel-title"></h4>
							</div>
							<div class="panel-body">
								<pre class='pre-scrollable'></pre>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="modal-footer"> -->
				<!-- <button class='btn btn-default' data-dismiss='modal'>Cancel</button>	 -->
				<!-- <button class='btn btn-success'>Submit</button>	 -->
			<!-- </div>	 -->
		</div>
	</div>
</div>

<!-- 从Dockerfile创建镜像 -->
<div class="modal" id='imgCrtModal' tabindex='-1'>
	<div class="modal-dialog">
	<!-- <div class="modal-dialog "> -->
		<div class="modal-content">
			<div class="modal-header">
				<a href="#" class="close" data-dismiss='modal'>&times;</a>
				<h5 class="modal-title"><strong>From Dockerfile Create Images</strong></h5>
			</div>
			<div class="modal-body">
				<form id='createForm' enctype="multipart/form-data">
					<div class="form-group">
						<label for="">Build Directory Name:</label>
						<input class='form-control'  name='dkFileDir'>
					</div>
					<div class="form-group">
						<label for="">Dockerfile:</label>
						<textarea class='form-control' rows='15' name='dkFileData'></textarea>
					</div>
					<div class="form-group">
						<label for="">Tag:</label>
						<input class='form-control' name='dkTag' placeholder='[REGISTRYHOST/][USERNAME/]NAME[:TAG]'>
					</div>
					<div class="checkbox">
						<label for="dkAddFileChkbx">
							<input id='dkAddFileChkbx' type='checkbox'>
							Add File
						</label>
					</div>
					<input class='form-control'  id='dkAddFile' type='file' name='dkAddFile[]'  multiple>
				</form>
			</div>
			<div class="modal-footer">
				<button class='btn btn-default' data-dismiss='modal'>Cancel</button>
				<button id='imgCrtBtn' class='btn btn-success' data-loading-text='Creating......'>Create</button>
			</div>
		</div>
	</div> </div>