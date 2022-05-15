package com.thevirtugroup.postitnote.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jetty.websocket.common.io.http.HttpResponseHeaderParseListener; 
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thevirtugroup.postitnote.model.Notes;
import com.thevirtugroup.postitnote.model.User;

/**
 */
@RestController
public class NoteController
{
	
	Map<String, List<Notes>> notesList = new HashMap<String, List<Notes>>(); 
	
	@RequestMapping(value="/api/saveNote/{userName}", method=RequestMethod.POST)
	public Map<String, List<Notes>> saveNote(@RequestBody Notes notes, @PathVariable("userName") String userName){  
		List<Notes> temp = notesList.get(userName);
		if(CollectionUtils.isEmpty(temp)) {
			temp = new ArrayList<Notes>();
		}
		temp.add(notes); 
		notesList.put(userName,temp);
		return notesList;
	}
	
	@RequestMapping(value="/api/getNotes/{userName}", method=RequestMethod.GET)
	public List<Notes>  getNote(@PathVariable("userName") String userName){ 
		return notesList.get(userName);
	}
	
}
