
<div class="panel panel-default">
	<div class="panel-heading clearfix">
		<h4 class="panel-title pull-left" style="padding-top: 7.5px;">Images <span class='badge'>0</span></h4>
		<div class="btn-group pull-right">
			<a id='dsplyAll' href="#" class="btn btn-info btn-sm"><strong>Display All</strong></a>

			<a id='delImg' href="#" class="btn btn-warning btn-sm"><strong>Delete</strong></a>
			<!-- <a id='tag' href="#tagModal" class="btn btn-success btn-sm " data-toggle='modal'><strong>Tag</strong></a> -->
			<a href="#" class="btn btn-default btn-sm"><strong>Add</strong></a>
		</div>
	</div>
		
	<table class="table table-hover table-responsive">
		<thead>
			<tr>
				<th><input id='full' type='checkbox' /></th>
				<th>Id</th>
				<th>ParentId</th>
				<th>Repository</th>
				<th>Tag</th>
				<th>Created</th>
				<th>VirtualSize</th>
			</tr>
		</thead>
		<tbody></tbody>
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
					<li><a href='#registry' data-toggle='tab'>Registry</a></li>
					<li><a href='#history' data-toggle='tab'>History</a></li>
					<li><a href='#inspect' data-toggle='tab'>Inspect</a></li>
				</ul>

				<div class="tab-content">
					<!-- tag标签 -->
					<div class='tab-pane active' id='tag'>
						<form class="form" id='tagForm'>
							<div class="form-group">
								<label>Source Tag</label>
								<input class="form-control" id='srcTagIpt' type='text' disabled/>
								<input id='srcImgId' type="hidden" name='srcTag'>
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
					<div class='tab-pane' id="registry">
						registry
					</div>
					<!-- history标签 -->
					<div class='tab-pane' id="history">
						history	
					</div>
					<!-- inspect标签 -->
					<div class='tab-pane' id="inspect">
						inspect
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

