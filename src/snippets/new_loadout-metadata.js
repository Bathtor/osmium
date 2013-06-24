/* Osmium
 * Copyright (C) 2012, 2013 Romain "Artefact2" Dalmaso <artefact2@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

osmium_init_metadata = function() {
	$('section#metadata select#view_perms').change(function() {
		var t = $(this);
		var pw = $('section#metadata input#pw');
		var vis = $('section#metadata select#visibility');

		if(t.val() === "1") {
			pw.prop('disabled', false);
			vis.val('1');
			vis.prop('disabled', true);
		} else {
			pw.val('');
			pw.prop('disabled', true);
			vis.prop('disabled', false);
		}
	}).change();

	$('div#nlmain > section#metadata input, div#nlmain > section#metadata textarea, div#nlmain > section#metadata select').change(function() {
		if(!("metadata" in osmium_clf)) {
			osmium_clf.metadata = {};
		}

		osmium_clf.metadata.title = $("section#metadata input#name").val();
		osmium_clf.metadata.description = $("section#metadata textarea#description").val();
		osmium_clf['client-version'] = $("section#metadata select#evebuildnumber").val();
		osmium_clf.metadata['X-tags'] = $("section#metadata input#tags").val().split(/\s+/);
		osmium_clf.metadata['X-Osmium-view-permission'] = $("section#metadata select#view_perms").val();
		osmium_clf.metadata['X-Osmium-edit-permission'] = $("section#metadata select#edit_perms").val();
		osmium_clf.metadata['X-Osmium-visibility'] = $("section#metadata select#visibility").val();
		osmium_clf.metadata['X-Osmium-clear-password'] = $("section#metadata input#pw").val();

		osmium_commit_clf();
		osmium_undo_push();
	}).keyup(function() {
		//$(this).change(); /* XXX too much request spam? */
	});
};

osmium_gen_metadata = function() {
	var section = $('div#nlmain > section#metadata');

	if("client-version" in osmium_clf) {
		section.find("select#evebuildnumber").val(osmium_clf['client-version']);
	}

	if(!("metadata" in osmium_clf)) return;

	if("title" in osmium_clf.metadata) {
		section.find('input#name').val(osmium_clf.metadata.title);
	}

	if("description" in osmium_clf.metadata) {
		section.find('textarea#description').val(osmium_clf.metadata.description);
	}

	if("X-tags" in osmium_clf.metadata) {
		section.find('input#tags').val(osmium_clf.metadata['X-tags'].join(' '));
	}

	section.find('select#edit_perms').val(osmium_clf.metadata['X-Osmium-edit-permission']);
	section.find('select#visibility').val(osmium_clf.metadata['X-Osmium-visibility']);
	section.find('select#view_perms').val(osmium_clf.metadata['X-Osmium-view-permission']);
};
