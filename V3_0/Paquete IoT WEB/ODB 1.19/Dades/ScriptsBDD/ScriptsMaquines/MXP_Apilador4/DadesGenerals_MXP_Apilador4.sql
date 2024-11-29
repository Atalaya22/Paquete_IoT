/****** Object:  Table [dbo].[Info_MXP_Apilador1_Alarmes]    Script Date: 2/13/2021 9:27:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Apiladors_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL,
 CONSTRAINT [PK_Info_Apiladors_Alarmes] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Apilador1_Info]    Script Date: 2/13/2021 9:26:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Apiladors_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_Apiladors_Info] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
GO
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	1	,N'	Disabled	',N'	Desactivat	',N'		',N'	Desactivado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	2	,N'	No air pressure in stacker zone	',N'	Sense pressió d’aire a la zona Apilador1	',N'		',N'	Sin presión de aire en la zona Apilador1	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	3	,N'	Waiting for manoeuvre start	',N'	Esperant inici de maniobra	',N'		',N'	Esperando inicio de maniobra	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	5	,N'	Detector fault: Mdxx.In03	',N'	Error detector Mdxx.In03	',N'		',N'	Fallo detector Mdxx.In03	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	11	,N'	Detector rails fault	',N'	Error detectors de les baranes	',N'		',N'	Fallo detectores barandillas	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	12	,N'	Detector fingers fault	',N'	Error detectors dels dits	',N'		',N'	Fallo detectores dedos	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	15	,N'	Servomotor not referenced	',N'	Servo no referenciat	',N'		',N'	Servo no referenciado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	16	,N'	Icla not referenced	',N'	Icla no referenciat	',N'		',N'	Icla no referenciado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	20	,N'	Error Servomotor Up/Down	',N'	Error en el servo Pujar/Baixar	',N'		',N'	Error en el servo Subir/Bajar	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	21	,N'	Stacker heigh error	',N'	Error alçada Apilador1	',N'		',N'	Error altura Apilador1	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	25	,N'	Stacker Icla not arrive at position	',N'	Icla no arriba a la posició	',N'		',N'	Icla no llega a la posicion	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	30	,N'	Detector fault: MDxx.In11 and MDxx.In09	',N'	Error detectors MDxx.In11 y Mdxx.In09	',N'		',N'	Fallo detectores MDxx.In11 y Mdxx.In09	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	35	,N'	Detector fault: Mdxx.In04	',N'	Error detector MDxx.In04	',N'		',N'	Fallo detector Mdxx.In04	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	40	,N'	Please check detector: MDxx.In15	',N'	Revisar detector MDxx.In15	',N'		',N'	Revisar detector MDxx.In15	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	45	,N'	Please check detector: MDxx.In02	',N'	Revisar detector MDxx.In02	',N'		',N'	Revisar detector MDxx.In02	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	50	,N'	Stacker servomotor not arrive at position	',N'	Servo Apilador1 no arriba a la posicio	',N'		',N'	Servo Apilador1 no llega a la posicion	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	51	,N'	Stucked box or blocked	',N'	Caixa encallada	',N'		',N'	Caja atascada	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	52	,N'	Turned box or blocked	',N'	Caixa girada	',N'		',N'	Caja girada	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	53	,N'	Box Stacker Paused	',N'	Apilador1 en Pausa	',N'		',N'	Apilador1 en Pausa	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	54	,N'	Inverter Error	',N'	Inverter en Error	',N'		',N'	Inverter en Error	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	55	,N'	IcLa position Error	',N'	Error en la posicio del Icla	',N'		',N'	Error en la posicion del Icla	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	56	,N'	Remove the boxes that have come out of the stacker	',N'	Treure les caixes que han sortit de lApilador1	',N'		',N'	Sacar las cajas que han salido del Apilador1	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	80	,N'	Running	',N'	Funcionant	',N'		',N'	Funcionando	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (0, N'Desconegut', N'Desconocido', N'Unknown')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (1, N'Interromput per alarma', N'Interrumpido por alarma', N'Aborted by alarm')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (2, N'Falta potència', N'Falta potencia', N'Power off')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (3, N'Falta marxa', N'Falta marcha', N'Waiting start')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (4, N'Canvi de format', N'Cambio de formato', N'Format change')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (5, N'Falta comanda', N'Falta comanda', N'Missing order')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (6, N'Esperant caixes', N'Esperando cajas', N'Waiting cases')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (7, N'Restablint', N'Restableciendo', N'Reseting')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (8, N'Esperant lliure', N'Esperando libre', N'Waiting free')
INSERT [dbo].[Info_Apiladors_Info] ([Id], [Ca], [Es], [En]) VALUES (9, N'Apilant caixes', N'Apilando cajas', N'Stacking cases')
GO
