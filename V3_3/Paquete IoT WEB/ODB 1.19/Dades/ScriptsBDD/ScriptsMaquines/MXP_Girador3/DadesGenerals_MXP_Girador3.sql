/****** Object:  Table [dbo].[Info_MXP_Girador1_Alarmes]    Script Date: 2/13/2021 9:27:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Giradors_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL,
 CONSTRAINT [PK_Info_Giradors_Alarmes] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Girador1_Info]    Script Date: 2/13/2021 9:26:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Giradors_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_Giradors_Info] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
GO
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	1	,N'	Turn to perform unknown. Remove the box in the box turner and perform a maneuver reset.	',N'	Gir a realitzar desconegut. Retirar la caixa del Girador1 i fer un reset de maniobra.	',N'		',N'	Giro a realizar desconocido. Retirar la caja del Girador1 y hacer un reset de maniobra.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	2	,N'	Case turner piston not raised properly. Check vertical piston upper and lower auto switch	',N'	El pistó del Girador1 de caixes no ha pujat correctament. Revisar DM superior i inferior del pistó vertical	',N'		',N'	El pistón del Girador1 de cajas no ha subido correctamente. Revisar detector magnético superior e inferior del pistón vertical	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	3	,N'	Box rotator jammed while rotating. Move manually through the SCADA and perform a maneuver reset.	',N'	Girador1 de caixes encallat mentre rotava. Moure manualment a través del SCADA i fer un reset de maniobra.	',N'		',N'	Girador1 de cajas atascado mientras rotaba. Mover manualmente a través del SCADA y hacer un reset de maniobra.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	4	,N'	Undefined active alarm on case turner. Do a maneuver or turner reset.	',N'	Alarma activa no definida e Girador1 de caixes. Fer un reset del Girador1 o de maniobra.	',N'		',N'	Alarma activa no definida en el Girador1 de cajas. Hacer un reset de maniobra o del Girador1.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	5	,N'	The box turner piston has not been lowered properly. Check upper and lower vertical piston magnetic detector	',N'	El pistó del Girador1 de caixes no ha baixat correctament. Revisar DM superior i inferior del pistó vertical	',N'		',N'	El pistón del Girador1 de cajas no ha bajado correctamente. Compruebe el detector magnético superior e inferior del pistón vertical.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	6	,N'	Box stuck in box turner. Remove the box.	',N'	Caixa encallada al Girador1 de caixes. Retirar la caixa.	',N'		',N'	Caja atascada en el Girador1 de cajas. Retirar la caja	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	10	,N'	The lower magnetic detector of the vertical piston of the box rotator is not detected. Check online.	',N'	No es detecta el DM inferior del pistó vertical del Girador1 de caixes. Revisar connexionat.	',N'		',N'	No se detecta el detector magnético inferior del pistón vertical del Girador1 de cajas. Revisar conexionado.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	66	,N'	Box turner drive error. Check electrical panel.	',N'	Error del variador del Girador1 de caixes. Revisar quadre elèctric.	',N'		',N'	Error del variador del Girador1 de cajas. Revisar cuadro eléctrico.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (0, N'Desconegut', N'Desconocido', N'Unknown')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (1, N'Interromput per alarma', N'Interrumpido por alarma', N'Aborted by alarm')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (2, N'Falta potència', N'Falta potencia', N'Power off')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (3, N'Falta marxa', N'Falta marcha', N'Waiting start')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (4, N'Canvi de format', N'Cambio de formato', N'Format change')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (5, N'Falta comanda', N'Falta comanda', N'Missing order')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (6, N'Esperant caixes', N'Esperando cajas', N'Waiting cases')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (7, N'Restablint', N'Restableciendo', N'Reseting')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (8, N'Esperant lliure', N'Esperando libre', N'Waiting free')
INSERT [dbo].[Info_Giradors_Info] ([Id], [Ca], [Es], [En]) VALUES (9, N'Girant caixes', N'Girando cajas', N'Turning cases')
GO
