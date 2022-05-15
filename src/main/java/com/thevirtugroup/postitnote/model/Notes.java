package com.thevirtugroup.postitnote.model;

public class Notes {

	String color;
	String note; 
	
	public Notes() {
		// TODO Auto-generated constructor stub
	}
	
	public Notes(String color, String note) {
		super();
		this.color = color;
		this.note = note;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}


}
